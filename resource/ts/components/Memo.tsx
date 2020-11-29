import * as React from 'react';
import { MemoRecord } from '@/indexeddb/memos';
import styled from 'styled-components';

const MemoWrap = styled.div`
    display: block;
    background-color: white;
    border: 1px solid gray;
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    text-align: left;
    position: relative;
`

const MemoBg = styled.div`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

const MemoTitle = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
`

const MemoText = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Children = styled.div`
    z-index: 1;
`

interface Props {
    memo: MemoRecord;
    onClick: () => void;
    children: any;
}

export const Memo: React.FC<Props> = (props) => {
    const { memo, onClick, children } = props;
    return (
        <MemoWrap>
            <MemoTitle
                onClick={onClick}
            >{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
            <Children>
                {children}
            </Children>
        </MemoWrap>
    )
}