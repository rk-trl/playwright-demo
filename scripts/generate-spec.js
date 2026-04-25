const fs = require('node:fs')
const path = require('node:path')

function toKebabCase(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseSection(lines, sectionName) {
  const sectionHeader = `## ${sectionName}`
  const start = lines.findIndex((line) => line.trim() === sectionHeader)
  if (start === -1) {
    return []
  }

  const items = []
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index].trim()
    if (line.startsWith('## ')) {
      break
    }
    if (line.startsWith('- ')) {
      items.push(line.replace(/^- /, '').trim())
    }
  }
  return items
}

function parseTitle(lines) {
  const titleLine = lines.find((line) => line.trim().startsWith('# '))
  if (!titleLine) {
    return 'Generated Story'
  }
  return titleLine.trim().replace(/^# /, '')
}

function resolveSpecFile(storyDir, storyName) {
  const existingSpec = fs
    .readdirSync(storyDir)
    .find((fileName) => fileName.endsWith('.spec.ts'))

  if (existingSpec) {
    return path.join(storyDir, existingSpec)
  }

  const storyWithoutPrefix = storyName.replace(/^US\d+-/, '')
  const baseName = toKebabCase(storyWithoutPrefix || storyName) || 'scenario'
  return path.join(storyDir, `${baseName}.spec.ts`)
}

function generateSpecContent({ title, steps, assertions, screenshots }) {
  const stepTodos =
    steps.length > 0
      ? steps.map((step) => `    // TODO: ${step}`).join('\n')
      : '    // TODO: Add scenario steps here.'

  const assertionTodos =
    assertions.length > 0
      ? assertions.map((assertion) => `    // TODO: Assert ${assertion}`).join('\n')
      : '    // TODO: Add assertions here.'

  const screenshotTodo =
    screenshots.length > 0
      ? screenshots
          .map(
            (fileName) =>
              `    // TODO: Capture screenshot when step is complete.\n    // await captureStepScreenshot(page, '${fileName}')`,
          )
          .join('\n')
      : "    // TODO: await captureStepScreenshot(page, 'scenario.png')"

  return `import { expect, test } from '@playwright/test'
import { captureStepScreenshot } from '../../helpers/screenshot'

test.describe('${title}', () => {
  test('${title} - generated scenario', async ({ page }) => {
${stepTodos}

${screenshotTodo}

${assertionTodos}
  })
})
`
}

function ensureDescriptionFile(storyDir, storyName) {
  const descriptionPath = path.join(storyDir, 'description.md')
  if (fs.existsSync(descriptionPath)) {
    return descriptionPath
  }

  const template = `# ${storyName}

## Overview
Describe this user story in plain English.

## Steps
- Add step 1
- Add step 2

## Screenshots
- add-screenshot-name.png

## Assertions
- Add expected outcome
`

  fs.writeFileSync(descriptionPath, template, 'utf8')
  return descriptionPath
}

function main() {
  const [, , storyName, ...restArgs] = process.argv
  const forceWrite = restArgs.includes('--force')

  if (!storyName) {
    console.error('Usage: npm run generate-spec -- <story-folder-name> [--force]')
    process.exit(1)
  }

  const storyDir = path.join(process.cwd(), 'tests', 'stories', storyName)
  fs.mkdirSync(storyDir, { recursive: true })

  const descriptionPath = ensureDescriptionFile(storyDir, storyName)
  const specPath = resolveSpecFile(storyDir, storyName)
  const description = fs.readFileSync(descriptionPath, 'utf8')
  const lines = description.split(/\r?\n/)

  if (fs.existsSync(specPath) && !forceWrite) {
    console.error(
      `Spec already exists at ${specPath}. Use --force to overwrite existing content.`,
    )
    process.exit(1)
  }

  const content = generateSpecContent({
    title: parseTitle(lines),
    steps: parseSection(lines, 'Steps'),
    assertions: parseSection(lines, 'Assertions'),
    screenshots: parseSection(lines, 'Screenshots'),
  })

  fs.writeFileSync(specPath, content, 'utf8')
  console.log(`Generated ${path.relative(process.cwd(), specPath)}`)
}

main()
