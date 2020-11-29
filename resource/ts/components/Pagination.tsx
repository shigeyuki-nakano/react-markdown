import * as React from 'react';
import styled from 'styled-components';

const PagingButton = styled.button`
    background: none;
    border: none;
    display: inline-block;
    height: 2rem;
    padding: 0.5rem 1rem;

    &:disabled {
    color: silver;
    }
`

interface Props {
    movePage: (targetPage: number) => void;
    page: number;
    maxPage: number;
}

export const Pagination: React.FC<Props> = (props) => {
    const canPrevPage: boolean = props.page > 1;
    const canNextPage: boolean = props.page < props.maxPage;

    return (
        <>
            <PagingButton
                onClick={() => props.movePage(props.page - 1)}
                disabled={!canPrevPage}
            >
                ＜
            </PagingButton>
            {props.page} / {props.maxPage}
            <PagingButton
                onClick={() => props.movePage(props.page + 1)}
                disabled={!canNextPage}
            >
                ＞
            </PagingButton>
        </>
    )
}