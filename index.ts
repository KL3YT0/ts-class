type Id = string | number;

interface Item<T> {
    id: Id;
    parent: Id;
    type?: T;
}

interface MapValue<T> {
    children: Id[];
    item: Item<T>;
}

class TreeStore<T> {
    private map: Map<string | number, MapValue<T>>;

    constructor(private items: Item<T>[]) {
        this.setMap();
    }

    getAll() {
        return items;
    }

    getItem(id: Id) {
        const node = this.map.get(id);

        if (!node) {
            throw new Error(`Attempt to get a non-existent object with id ${id}`);
        }

        return node.item;
    }

    getChildren(id: Id) {
        const node = this.map.get(id);

        return node.children.map((id) => this.getItem(id));
    }

    getAllChildren(id: Id) {
        const allChildren = [];
        const IdsStack: Id[] = [id];

        while (IdsStack.length) {
            const currId = IdsStack.shift();

            allChildren.push(...this.getChildren(currId));
            IdsStack.push(...this.map.get(currId).children);
        }

        return allChildren;
    }

    getAllParents(id: Id) {
        let allParents = [];
        let currId = id;
        let parentId: Id;

        while ((parentId = this.map.get(currId)?.item.parent) !== 'root') {
            allParents.push(this.getItem(parentId));
            currId = parentId;
        }

        return allParents;
    }

    private setMap() {
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

            if (!parentNode) continue;

            const { children } = parentNode;

            this.map.set(parent, { ...parentNode, children: [...children, id] });
        }
    }
}

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

const ts = new TreeStore<any>(items);

export { TreeStore };
