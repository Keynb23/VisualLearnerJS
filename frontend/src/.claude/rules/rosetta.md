# 🧩 The Rosetta Modal System

## Trigger Logic
- Every UI/Feature component has a clickable tooltip icon.
- Clicking the tooltip opens a full-screen or centered Modal focusing on that specific component.

## Modal Layout
- **Top Center:** Tabs for "About Me" (Default) and "Code to English".
- **Action Bar:** "Copy Code" button and "Try in Playground" button.

## Tabs
1. **About Me:** - **Left Side:** Live preview of the component.
   - **Right Side:** Narrative description of the component's purpose and UX.
2. **Code to English (Rosetta):**
   - **Left Side:** Syntax-highlighted TypeScript/React code.
   - **Right Side:** Line-by-line English translation.
   - **Interaction:** Synchronized hovering. Hovering line N on the left highlights line N on the right with matching OKLCH colors.