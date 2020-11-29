import * as React from 'react';
import styled from 'styled-components';
import { useStateWithStorage } from '@/hooks/useStateWithStorage';
import { putMemo } from '@/indexeddb/memos';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { SaveModal } from '@/components/SaveModal';
import { Link } from 'react-router-dom';
import ConvertMarkdownWorker from 'worker-loader!@/worker/convertMarkdownWorker'

const convertMarkdownWorker = new ConvertMarkdownWorker();
const { useState, useEffect } = React;

const Wrapper = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
`

const TextArea = styled.textarea`
    border-right: 1px solid silver;
    border-top: 1px solid silver;
    bottom: 0;
    font-size: 1rem;
    left: 0;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

const HeaderArea = styled.div`
    top: 0;
    left: 0;
`

interface Props {
    text: string;
    setText: (text: string) => void;
}

export const Editor: React.FC<Props> = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [html, setHtml] = useState('');
    
    useEffect(() => {
        convertMarkdownWorker.onmessage = (e) => {
            setHtml(e.data.html);
        }
    });
    useEffect(() => {
        convertMarkdownWorker.postMessage(props.text);
    }, [props.text]);

    return (
        <>
            <HeaderArea>
                <Header title="Markdown Editor">
                    <Button onClick={() => setShowModal(true)}>
                        保存する
                    </Button>
                    <Link to="/history">
                        履歴を見る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                <TextArea 
                    placeholder="テキスト入力エリア"
                    onChange={(e) => props.setText(e.target.value)}
                    value={props.text}
                />
                <Preview>
                    <div dangerouslySetInnerHTML={{ __html: html }}/>
                </Preview>
            </Wrapper>
            {showModal && (
                <SaveModal
                    onSave={(title: string): void => {
                        putMemo(title, props.text);
                        setShowModal(false)
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    )
}