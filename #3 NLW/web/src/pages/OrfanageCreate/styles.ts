import styled, { css } from 'styled-components';

interface ISelectButtonProps {
    active?: boolean;
}

export const Container = styled.div`
    display: flex;
`

export const Content = styled.main`
    flex: 1;
`

export const Form = styled.form`
    width: 700px;
    margin: 64px auto;

    background: #FFFFFF;
    border: 1px solid #D3E2E5;
    border-radius: 20px;

    padding: 64px 80px;

    overflow: hidden;

    fieldset {
        border: 0;

        & + fieldset {
            margin-top: 80px;
        }

        legend {
            width: 100%;

            font-size: 32px;
            line-height: 34px;
            color: #5C8599;
            font-weight: 700;

            border-bottom: 1px solid #D3E2E5;
            margin-bottom: 40px;
            padding-bottom: 24px;
        }
    }

    > button {
        margin-top: 64px;

        width: 100%;
        height: 64px;
        border: 0;
        cursor: pointer;
        background: #3CDC8C;
        border-radius: 20px;
        color: #FFFFFF;
        font-weight: 800;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.2s;

        svg {
            margin-right: 16px;
        }
        &:hover {
            background: #36CF82;
        }
    }
`

export const InputContainer = styled.div`
    & + div {
        margin-top: 24px;
    }

    label {
        display: flex;
        color: #8FA7B3;
        margin-bottom: 8px;
        line-height: 24px;

        span {
            font-size: 14px;
            color: #8FA7B3;
            margin-left: 24px;
            line-height: 24px;
        }
    }

    input, textarea {
        width: 100%;
        background: #F5F8FA;
        border: 1px solid #D3E2E5;
        border-radius: 20px;
        outline: none;
        color: #5C8599;
    }

    input {
        height: 64px;
        padding: 0 16px;
    }

    textarea {
        min-height: 120px;
        max-height: 240px;
        resize: vertical;
        padding: 16px;
        line-height: 28px;
    }

    > button {
        width: 100%;
        height: 64px;
        background: #F5F8FA;
        border: 1px dashed #96D2F0;
        border-radius: 20px;
        cursor: pointer;
    }
`

export const OpenOnWeekendContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const SelectButton = styled.button<ISelectButtonProps>`
    height: 64px;
    background: #F5F8FA;
    border: 1px solid #D3E2E5;
    color: #5C8599;
    cursor: pointer;

    ${props => props.active && css`
        background: #EDFFF6;
        border: 1px solid #A1E9C5;
        color: #37C77F;
    `}

    &:first-child {
        border-radius: 20px 0px 0px 20px;
    }

    &:last-child {
        border-radius: 0 20px 20px 0;
         border-left: 0;
    }
`
