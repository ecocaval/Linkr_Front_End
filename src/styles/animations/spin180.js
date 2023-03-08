import { keyframes } from 'styled-components'

export const spin180 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);
    }
`

export const reverseSpin180 = keyframes`
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
`
