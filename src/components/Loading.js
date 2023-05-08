import React from 'react';
import { Background, LoadingText } from './LoadingStyles';


// 로딩화면 컴포넌트
export default () => {
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
            <img src="assets/loadingLogo.gif" alt='로딩중' width="20%" />
        </Background>
    );
};