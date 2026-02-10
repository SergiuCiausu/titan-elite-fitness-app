import { TreeNode } from "./treenode";

export class ConsecutiveTree<T = unknown> {
  private root: TreeNode<T>;

  constructor() {
    this.root = new TreeNode();
  }

  insert(path: number[], value: T) {
    let node = this.root;

    for (const segment of path) {
      if (!node.children.has(segment)) {
        node.children.set(segment, new TreeNode());
      }
      node = node.children.get(segment)!;
    }

    if (!node.value) node.value = [];

    node.value.push(value);
  }

  getNode(path: number[]): TreeNode<T> | null {
    let node = this.root;
    for (const segment of path) {
      const next = node.children.get(segment);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  getConsecutiveDepth(prefixPath: number[], startValue: number): number {
    const node = this.getNode(prefixPath);
    if (!node) return 0;

    let depth = 1;
    let current = startValue;

    while (node.children.has(current + 1)) {
      current++;
      depth++;
    }

    return depth;
  }

  getChildrenCount(prefixPath: number[]): number {
    const node = this.getNode(prefixPath);
    if (!node) return 0;
    return node.children.size;
  }
}