import styled from "@emotion/styled"

export const SelectOption = styled.div`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
`
export const PriceBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;

    border-radius: 5px;
    background-color: #eee;
    p:first-of-type {
        font-size: 15px;
        font-weight: 600;
    }
    p:last-of-type {
        font-size: 20px;
        font-weight: 700;
    }
`