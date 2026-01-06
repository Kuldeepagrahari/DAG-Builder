# Pipeline Editor (DAG Builder)

A React-based visual editor for creating and managing **Directed Acyclic Graphs (DAGs)**.  
The application enables users to visually construct data-processing pipelines while enforcing strict validation rules to ensure correctness and acyclic structure.

This project was built as a **Frontend Intern Assignment** and **strictly follows all Core Requirements and Bonus suggestions** outlined in the assignment document.

---

## 🎥 Demo & Screenshots

🔴 **Live Demo:** https://promptly-assignment.vercel.app/

📺 **Video Walkthrough:** https://www.youtube.com/watch?v=XRc72wFnwKQ

<img width="1910" height="879" alt="image" src="https://github.com/user-attachments/assets/8b59e6cd-7f0c-4973-b9f8-d0352514b1ad" />
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/df3b5557-91eb-4211-ac84-d5328bd110b0" />
<img width="1919" height="893" alt="image" src="https://github.com/user-attachments/assets/22b5ae75-06ca-46e3-b5e4-1ec4526a760f" />
<img width="1919" height="884" alt="image" src="https://github.com/user-attachments/assets/f89a0df7-ef78-4d05-91c0-8b93958643a0" />
<img width="1919" height="890" alt="image" src="https://github.com/user-attachments/assets/26e56f30-238f-4c26-b15f-012a9936e2ca" />
<img width="1916" height="898" alt="image" src="https://github.com/user-attachments/assets/2a8bd27f-50ef-4612-b0f0-650630b546e2" />
<img width="1916" height="890" alt="image" src="https://github.com/user-attachments/assets/bda19a7b-03d4-4de8-839a-67ff32a4e32b" />
<img width="1919" height="886" alt="image" src="https://github.com/user-attachments/assets/378e7d09-6a1a-4827-9e2f-4bdd6728ed29" />


*(Add screenshots showing the editor, context menu, validation panel, and auto-layout here)*

---

## ✅ Features Implemented

All required features from the assignment have been fully implemented, along with several optional UX enhancements.

---

### 1. Core Graph Functionality

- **Add Nodes**  
  Users can add nodes via an “Add Node” button, which opens a prompt to enter a custom label.

- **Draw Edges (Connections)**  
  Users can manually draw connections between nodes with clear visual directionality (arrows).

- **Strict Connection Rules**
  - Connections are only allowed from **Outgoing (Right)** → **Incoming (Left)** handles.
  - Incoming → Incoming and Outgoing → Outgoing connections are physically disallowed via custom node handles.
  - **Self-connections (node connected to itself) are prevented.**

- **Delete Nodes & Edges**
  - Nodes can be deleted using a custom right-click context menu.
  - Associated edges are automatically removed to maintain graph consistency.

---

### 2. Real-Time DAG Validation Status

The application validates the pipeline **in real time** and displays the current status clearly using a **Green (Valid)** or **Red (Invalid)** indicator.

A pipeline is considered **valid only if**:
- It contains **at least 2 nodes**
- **No cycles** are present (DAG enforcement)
- Every node is connected to at least one edge
- All edges follow the correct incoming/outgoing direction rules
- No self-loops exist

---

### 3. Bonus Feature: Auto Layout

- Implemented an **Auto Layout** button using the `dagre` library.
- Automatically rearranges nodes into a clean **left-to-right hierarchical flow**.
- Improves readability, especially for larger pipelines.

---

### 4. Bonus UX Enhancements

In addition to core requirements, the following UX improvements were implemented:

- **Custom Context Menu**  
  Right-click on a node to access delete actions.

- **JSON Debug Preview**  
  Displays a mini JSON view of the DAG structure (nodes and edges) for debugging and transparency.

- **Visual Polish**
  - Clean layout and spacing
  - Consistent icons using `lucide-react`
  - Clear visual feedback for pipeline validity

---

## 🛠️ Tech Stack & Architecture Decisions

### Libraries Used

- **React Flow (v11)**  
  Handles graph rendering, dragging, zooming, and interactions, allowing focus on validation logic instead of canvas math.

- **Dagre**  
  Used for automatic graph layout; an industry-standard solution for hierarchical DAG positioning.

- **Lucide React**  
  Lightweight, consistent SVG icon library.

- **Vite + TypeScript**  
  Fast development environment with strict type safety.

---

### Project Structure

The codebase follows a **feature-based modular structure** to keep it readable, scalable, and maintainable:

```text
src/
├── components/
│   ├── PipelineNode/       # Custom node with strict handle rules
│   ├── Header/             # Application header
│   ├── Toolbar/            # Add Node, Auto Layout, Debug actions
│   ├── ContextMenu/        # Right-click menu logic
│   ├── JsonPreview/        # DAG JSON debugging panel
│   └── StatusPanel/        # Real-time validation feedback
├── hooks/
│   └── useDAGValidation.ts # DFS-based cycle detection logic
├── utils/
│   └── layout.ts           # Dagre auto-layout configuration
└── App.tsx                 # Main application entry
```

🧠 Challenges & Solutions
1. DAG Cycle Detection

Challenge:
Graphs normally allow cycles, but a DAG must not.

Solution:
Implemented a custom React hook using Depth First Search (DFS) with a recursion stack.
If a node is revisited while still in the stack, a cycle is detected and the pipeline is marked invalid immediately.

2. Strict Type Safety with React Flow

Challenge:
Integrating React Flow with strict TypeScript settings caused build-time issues related to type exports.

Solution:
Used explicit type-only imports (import { type NodeProps }) to cleanly separate runtime code from type definitions.

3. Handling Ghost Edges

Challenge:
Deleting a node could leave connected edges behind, leading to inconsistent state.

Solution:
Refactored deletion logic to remove both the node and all associated edges in a single operation.

🚀 Getting Started
Prerequisites

Node.js v16 or higher

1. Clone the Repository
git clone https://github.com/Kuldeepagrahari/DAG-Builder.git
cd dag-builder

2. Install Dependencies
npm install

3. Run Development Server
npm run dev

4. Build for Production
npm run build

📚 References

React Flow Documentation — https://reactflow.dev/

Dagre Graph Layout — https://github.com/dagrejs/dagre

Depth First Search (Cycle Detection) — https://en.wikipedia.org/wiki/Depth-first_search


