import React, { useRef } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import Navbaar from './Navbaar'

import { Navigate } from 'react-router';
const regForName = RegExp(/^[a-zA-Z]/);


export default function Home() {
    const budgetRef = useRef(0)
    const titleRef = useRef('')
    const amountRef = useRef(0)

    const addBudget = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bud = parseInt(budgetRef.current.value);
        if (bud > 0) {
            user.budget = user.budget + bud
            localStorage.setItem('user', JSON.stringify(user))
            budgetRef.current.value = ""
        }
        else {
            alert("Budget Shold be more than Zer0")
        }
    }

    const addexpenses = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const usertitle = titleRef.current.value
        const useramount = parseInt(amountRef.current.value)
        if (usertitle != null && regForName.test(usertitle)) {
            localStorage.setItem('user', JSON.stringify(user))
            if (useramount > 0) {
                const expense = { title: usertitle, amount: useramount }
                user.expenses = [...user.expenses, expense]
                localStorage.setItem('user', JSON.stringify(user))
                titleRef.current.value = ""
                amountRef.current.value = ""
            }
            else {
                alert("Budget Shold be more than Zer0")
            }
        }
        else {
            alert("Please enter correct title")
        }
    }
    return (
        <>{localStorage.getItem('user') !== undefined ?
            <>
                <Navbaar />
                <Row>
                    <Container>

                        <Row>
                            <div className="container border border-dark rounded  pt-4 pb-3" style={{ width: "500px", marginTop: "50px", marginBottom: "auto" }}>
                                <Form >
                                    <h2 className="text-primary">Enter Budget</h2>
                                    <Form.Group className="mb-3 " >

                                        <Form.Control
                                            ref={budgetRef}
                                            type="number"
                                            label="enter your budget" />

                                    </Form.Group>



                                    <Button className="m-2" onClick={() => addBudget()}>Calculate</Button>

                                </Form>

                            </div >
                            <div className="container border border-dark rounded  pt-4 pb-3" style={{ width: "500px", marginTop: "50px", marginBottom: "20px" }}>
                                <Form >
                                    <h2 className="text-primary">Expenses</h2>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="float-start text-dark" >Enter Your Expense</Form.Label>
                                        <Form.Control
                                            ref={titleRef}
                                            name="title"
                                            label="Expense Title" />

                                    </Form.Group>

                                    <Form.Group className="mb-3 " >
                                        <Form.Label className="float-start text-dark" >Enter Your Expense Amount</Form.Label>
                                        <Form.Control type="number"
                                            ref={amountRef}
                                            name="amount"
                                            label="EnterAmount" />


                                    </Form.Group>


                                    <Button className="m-2" onClick={() => addexpenses()}>Add Expense</Button>

                                </Form>

                            </div >
                        </Row>
                    </Container>
                </Row>
            </>
        
            : <Navigate to="/"></Navigate>}

        </>
    )
}
