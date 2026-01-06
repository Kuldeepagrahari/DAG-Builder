import { type Node, type Edge } from "reactflow";
import { useMemo } from "react";

// Custom Hook: useDAGValidation - This hook validates whether a given graph is a valid DAG (Directed Acyclic Graph).

export const useDAGValidation = (nodes: Node[], edges: Edge[]) => {
  return useMemo(() => {

    /* ================================
       Condition 1: Basic Validity Check
       ================================ */

    // no nodes are present, condition failed
    if (nodes.length === 0) {
      return { 
        isValid: true,
        message: "Add your first node"
      };
    }

    // A DAG should have at least 2 nodes
    if (nodes.length < 2) {
      return { 
        isValid: false, 
        message: "Add at least 2 nodes" 
      };
    }

    /* =========================================
       Condition 2: Every Node Must Be Connected
       ========================================= */

    // storing all connected nodes
    const connectedNodes = new Set<string>();

    edges.forEach((edge) => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    // If any node is not part of an edge, it is disconnected
    for (const node of nodes) {
      if (!connectedNodes.has(node.id)) {
        return {
          isValid: false,
          message: `Node "${node.data.label}" is not connected, every node must be connected.`,
        };
      }
    }

    /* ==================================
       Condition 3: Graph Must Be Acyclic - no cycle
       ==================================
       Algorithm: DFS traversal.
    */

    // Step 1: creating an adjacency list 
    // Example: A -> [B, C]
    const adj = new Map<string, string[]>();

    edges.forEach((edge) => {
      if (!adj.has(edge.source)) {
        adj.set(edge.source, []);
      }
      adj.get(edge.source)!.push(edge.target);
    });

    // track visited nodes
    const visited = new Set<string>();

    // track nodes in current DFS path
    const recursionStack = new Set<string>();

    const dfs = (nodeId: string): boolean => {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      const neighbors = adj.get(nodeId) || [];

      for (const neighbor of neighbors) {
        // If neighbor is not visited then only explore it
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) return true;
        }
        // If neighbor is already in recursion stack, cycle founded
        else if (recursionStack.has(neighbor)) {
          return true;
        }
      }

      // Remove node from recursion stack after DFS
      recursionStack.delete(nodeId);
      return false;
    };

    // Run DFS for every unvisited node
    for (const node of nodes) {
      if (!visited.has(node.id)) {
        if (dfs(node.id)) {
          return {
            isValid: false,
            message: "Cycle detected! cycles are not allowed in a DAG.",
          };
        }
      }
    }

   
    // all checks passed - so dag is valid
    return { isValid: true, message: "DAG is valid" };

  }, [nodes, edges])
};
