"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStore = void 0;
class TreeStore {
    constructor(items) {
        this.items = items;
        this.setMap();
    }
    getAll() {
        return items;
    }
    getItem(id) {
        const node = this.map.get(id);
        if (!node) {
            throw new Error(`Attempt to get a non-existent object with id ${id}`);
        }
        return node.item;
    }
    getChildren(id) {
        const node = this.map.get(id);
        return node.children.map((id) => this.getItem(id));
    }
    getAllChildren(id) {
        const allChildren = [];
        const IdsStack = [id];
        while (IdsStack.length) {
            const currId = IdsStack.shift();
            allChildren.push(...this.getChildren(currId));
            IdsStack.push(...this.map.get(currId).children);
        }
        return allChildren;
    }
    getAllParents(id) {
        var _a;
        let allParents = [];
        let currId = id;
        let parentId;
        while ((parentId = (_a = this.map.get(currId)) === null || _a === void 0 ? void 0 : _a.item.parent) !== 'root') {
            allParents.push(this.getItem(parentId));
            currId = parentId;
        }
        return allParents;
    }
    setMap() {
        this.map = new Map();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (!this.map.has(item.id)) {
                this.map.set(item.id, {
                    children: [],
                    item,
                });
            }
        }
        for (let i = 0; i < this.items.length; i++) {
            const { id, parent } = this.items[i];
            const parentNode = this.map.get(parent);
            if (!parentNode)
                continue;
            const { children } = parentNode;
            this.map.set(parent, Object.assign(Object.assign({}, parentNode), { children: [...children, id] }));
        }
    }
}
exports.TreeStore = TreeStore;
const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
