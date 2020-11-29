import Dexie from 'dexie';
import { Constants } from '@/Constants';
import { createTempVariable } from 'typescript';

export interface MemoRecord {
    datetime: string
    title: string
    text: string
}

const { DB_NAME, NUM_PER_PAGE } = Constants;

const database = new Dexie(DB_NAME);
database.version(1).stores({memos: '&datetime'});
const memos: Dexie.Table<MemoRecord, string> = database.table('memos');

export const putMemo = async (title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString();
    await memos.put({datetime, title, text});
}

export const getMemoPageCount = async (): Promise<number> => {
    const totalCount = await memos.count();
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
    return pageCount > 0 ? pageCount : 1;
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
    const offset = (page - 1) * NUM_PER_PAGE;
    return memos.orderBy('datetime')
        .reverse()
        .offset(offset)
        .limit(NUM_PER_PAGE)
        .toArray();
}

export const deleteMemo = async (key: string): Promise<void> => {
    await memos.delete(key);
}