import styled, { css } from 'styled-components';

interface IButtonImageProps {
    active?: boolean;
}

interface IOpenOnWeekendsProps {
    open: boolean;
}

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
`

export const Content = styled.main`
    flex: 1;
`

export const DetailsContainer = styled.div`
    width: 700px;
    margin: 64px auto;

    background: #FFFFFF;
    border: 1px solid #D3E2E5;
    border-radius: 20px;

    overflow: hidden;

    > img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
`

export const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;

    margin: 16px 40px 0;
`

export const ButtonImage = styled.button<IButtonImageProps>`
    border: 0;
    height: 88px;
    background: none;
    cursor: pointer;
    border-radius: 20px;
    overflow: hidden;
    outline: none;

    opacity: 0.6;

    ${props => props.active && css`
        opacity: 1;
    `}

    > img {
        width: 100%;
        height: 88px;
        object-fit: cover;
    }
`

export const OrphanageDetails = styled.div`
    padding: 80px;

    h1 {
        color: #4D6F80;
        font-size: 54px;
        line-height: 54px;
        margin-bottom: 8px;
    }

    p {
        line-height: 28px;
        color: #5C8599;
        margin-top: 24px;
    }

    hr {
        width: 100%;
        height: 1px;
        border: 0;
        background: #D3E2E6;
        margin: 64px 0;
    }

    > h2 {
        font-size: 36px;
        line-height: 46px;
        color: #4D6F80;
    }

    > button {
        margin-top: 64px;
        width: 100%;
        height: 64px;
        background: #3cdc8c;
        border-radius: 20px;
        color: #FFF;
        font-weight: 800;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.2s;

        &:hover {
            background: #36cf82;
        }

        svg {
            margin-right: 16px;
        }
    }
`

export const MapContainer = styled.div`
    margin-top: 64px;
    background: #E6F7FB;
    border: 1px solid #B3DAE2;
    border-radius: 20px;

    footer {
        padding: 20px 0;
        text-align: center;

        a {
            line-height: 24px;
            color: #0089A5;
            text-decoration: none;
        }
    }
`

export const OpenDetails = styled.div`
    margin-top: 24px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;

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
export const OpeningHoursContainer = styled.div`
    padding: 32px 24px;
    border-radius: 20px;
    line-height: 28px;

    background: linear-gradient(149.97deg, #E6F7FB 8.13%, #FFFFFF 92.67%);
    border: 1px solid #B3DAE2;
    color: #5C8599;

    > svg {
        display: block;
        margin-bottom: 20px;
    }
`

export const OpenWeekends = styled.div<IOpenOnWeekendsProps>`
    padding: 32px 24px;
    border-radius: 20px;
    line-height: 28px;
    background: linear-gradient(154.16deg, #FDF0F5 7.85%, #FFF 91.03%);
    border: 1px solid #FFBCD4;
    color: #FF669D;

    svg {
        display: block;
        margin-bottom: 20px;
        color: #FF669D;
    }

    ${props => props.open && css`
        background: linear-gradient(154.16deg, #EDFFF6 7.85%, #FFF 91.03%);
        border: 1px solid #A1E9C5;
        color: #37C77F;

        svg {
            color: #37C77F;
        }
    `}
`
