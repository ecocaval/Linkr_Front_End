import { keyframes } from 'styled-components'

export const fadeUp = keyframes`
    from {
        top: 0;
        opacity: 0;
    }
    to {
        top: var(--header-height);
        opacity: 1;
    }
`

export const reverseFadeUp = keyframes`
    from {
        top: var(--header-height);
        opacity: 1;
    }
    to {
        top: 0;
        opacity: 0;
    }
`