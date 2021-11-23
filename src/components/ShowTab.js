import React, { useState, useEffect, useRef } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap';
import Navbaar from './Navbaar'
// import axios from 'axios';
import { Navigate } from 'react-router';

export default function ShowTab() {
    const [data, setData] = useState({});
    const [userdata, setuserdata] = useState([]);
    const [index, setindex] = useState(0);

    const titleRef = useRef('')
    const amountRef = useRef('')

    const Delete = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bool = window.confirm("are you sure");
        if (bool === true) {
            user.expenses.splice(index, 1)
            setData({ ...user });
            localStorage.setItem('user', JSON.stringify(user));
            // setuserdata(user.expenses);
        }
    }
    const update = (ele, index) => {
        console.log(ele)
        // let temp=JSON.parse(localStorage.getItem('user'));
        titleRef.current.value = ele.title
        amountRef.current.value = ele.amount
        setindex(index)
    }

    const updatedata = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let temp = user.expenses
        console.log(temp)
        temp[index].title = titleRef.current.value
        temp[index].amount = parseInt(amountRef.current.value)
        console.log(temp)
        user.expenses = temp
        // temp.expenses[]
        localStorage.setItem('user', JSON.stringify(user))
        setuserdata([...user.expenses])
        titleRef.current.value = null
        amountRef.current.value = null

    }




    useEffect(() => {
        if (localStorage.getItem('user') != undefined) {
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.expenses
            setuserdata([...userd])


        }
    }, []);
    return (
        <>
            {localStorage.getItem('user') !== undefined ?
                <>
                    <Navbaar /><br />

                    <Container>
                        <Form >
                            <h2 className="text-primary">Update details</h2>
                            <Form.Group className="mb-3">
                                <Form.Label className="float-start text-dark" >Email address</Form.Label>
                                <Form.Control type="text"
                                    ref={titleRef} />

                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label className="float" />
                                <Form.Control type="text"
                                    ref={amountRef} />

                            </Form.Group>


                            <Button variant="success" onClick={updatedata}>
                                update
                            </Button>




                        </Form>
                    </Container>





                    <Container>

                        <h2 className="d-flex justify-content-center">Enquiry details list</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>title</th>
                                    <th>amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.map((list, index) =>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{list.title}</td>
                                        <td>{list.amount}</td>
                                        <td>  &nbsp; <button onClick={() => Delete(index)} >Delete</button>&nbsp;
                                            <button onClick={() => update(list, index)}>Update</button> </td>




                                    </tr>)}
                            </tbody>
                        </Table>


                    </Container>
                </>
                :

                <Navigate to="/" />}

        </>
    )
}
