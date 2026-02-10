export class TreeNode<T = unknown> {
  children: Map<number, TreeNode<T>>;
  value?: T[];

  constructor() {
    this.children = new Map();
    this.value = undefined;
  }
}