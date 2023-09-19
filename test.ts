import { describe, expect, it } from '@jest/globals';
import { TreeStore, items } from '.';

function createTestTs() {
    return new TreeStore(items);
}

describe('TreeStore', () => {
    let ts: TreeStore<any>;

    beforeEach(() => {
        ts = createTestTs();
    });

    it('getAll should return original arr', () => {
        expect(ts.getAll()).toEqual(items);
    });

    it('getItem should return object if it exist', () => {
        expect(ts.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
    });

    it('getItem should throw error if object not exist', () => {
        try {
            ts.getItem('999');
        } catch (err) {
            expect(err.message).toBe('Attempt to get a non-existent object with id 999');
        }
    });

    it('getChildren should return all local children', () => {
        expect(ts.getChildren(4)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]);

        expect(ts.getChildren(5)).toEqual([]);

        expect(ts.getChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
        ]);
    });

    it('getAllChildren should return all global children', () => {
        expect(ts.getAllChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]);
    });

    it('getAllParents should return all parents', () => {
        expect(ts.getAllParents(7)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' },
        ]);
    });
});
