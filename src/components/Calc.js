import React, { useEffect, useState } from 'react'
import Navbaar from './Navbaar'
import { Container, Row, Col } from 'react-bootstrap'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';

export default function Calc() {
    const [budget, setbudget] = useState(0)
    const [expenses, setexpenses] = useState(0)
    const [balance, setbalance] = useState(0)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setbudget(user.budget)
        let exp = 0
        user.expenses.map(ele => {
            exp = ele.amount + exp
        })
        setexpenses(exp)
        setbalance(budget - expenses)
    })

    return (
        <div>
            <Navbaar/>

            <Container>
                <Row>
                    <Col><h2 style={{color:"blue",textAlign:"center"}}>Budget</h2></Col>
                    <Col><h2 style={{color:"blue",textAlign:"center"}}>Expenses</h2></Col>
                    <Col><h2 style={{color:"blue",textAlign:"center"}}>Balance</h2></Col>
                </Row>
               <Row>
                   <Col style={{textAlign:"center"}}><LocalAtmIcon style={{fontSize:80,color:"green"}}/></Col>
                   <Col style={{textAlign:"center"}}><PaymentIcon style={{fontSize:80,color:"red"}} /></Col>
                   <Col style={{textAlign:"center"}}><AttachMoneyIcon style={{fontSize:80,color:"green"}} /></Col>
                   </Row>
                <Row>
                    <Col> <h4 style={{textAlign:"center",fontSize:30}}>{budget}</h4></Col>
                    <Col> <h4 style={{textAlign:"center",fontSize:30}}>{expenses}</h4></Col>
                    <Col> <h4 style={{textAlign:"center",fontSize:30}}>{balance}</h4></Col>
                </Row>
            </Container>

        </div>
    )
}
