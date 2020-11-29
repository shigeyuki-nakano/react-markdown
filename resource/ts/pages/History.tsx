import * as React from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';
import {
    getMemos,
    MemoRecord,
    getMemoPageCount,
    deleteMemo
} from '@/indexeddb/memos';
import styled from 'styled-components';

import { Header } from '@/components/Header';
import { useStateWithStorage } from '@/hooks/useStateWithStorage';
import { Pagination } from '@/components/Pagination';
import { setTextRange } from 'typescript';
import { Memo } from '@/components/Memo';
import { Button } from '@/components/Button';

const { useState, useEffect } = React;

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
`

const Wrapper = styled.div`
    bottom: 3rem;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
    padding: 0 1rem;
    overflow-y: scroll;
`

const PageArea = styled.div`
    bottom: 0;
    height: 3rem;
    left: 0;
    line-height: 2rem;
    padding: 0.5rem;
    position: fixed;
    right: 0;
    text-align: center;
`

interface Props {
    setText: (text: string) => void;
}

export const History: React.FC<Props> = (props) => {
    const [memos, setMemos] = useState<MemoRecord[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const history = useHistory();

    useEffect(() => {
        // 1ページ目のメモを取得
        getMemos(1).then((memos: MemoRecord[]) => setMemos(memos));
        // ページ数を取得し、最大ページ数に挿入
        getMemoPageCount().then((pageNum: number) => setMaxPage(pageNum));
    }, []);

    // メモが削除されたなど数が変わったときに再レンダリング
    useEffect(() => {
        getMemos(page).then((memos: MemoRecord[]) => setMemos(memos));
        getMemoPageCount().then((pageNum: number) => setMaxPage(pageNum));
    }, [memos]);

    // ページ移動処理
    const movePage = (targetPage: number) => {
        if(targetPage < 1 || maxPage < targetPage) {
            return;
        }
        // 移動対象のページ番号を挿入
        setPage(targetPage);
        // 移動対象のメモを取得
        getMemos(targetPage).then((memos: MemoRecord[]) => setMemos(memos))
    }
    return (
        <>
            <HeaderArea>
                <Header title="履歴">
                    <Link to="/editor">
                        エディタに戻る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                {memos.map((memo, i: number) => (
                    <Memo
                        memo={memo}
                        key={memo.datetime}
                        onClick={() => {
                            props.setText(memo.text);
                            history.push('/editor')
                        }}
                    >
                        <Button
                            onClick={() => {
                                deleteMemo(memo.datetime)
                            }}
                        >削除</Button>
                    </Memo>
                ))}
            </Wrapper>
            <PageArea>
                <Pagination
                    page={page}
                    maxPage={maxPage}
                    movePage={movePage}
                />
            </PageArea>
        </>
    )
}