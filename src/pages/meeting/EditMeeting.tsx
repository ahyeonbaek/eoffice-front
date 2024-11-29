import Sidebar from "../../components/sidebar/Siderbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ChangeEvent, useState } from "react";

interface Regist{
    meetingName: string;
    meetinglocation: string;
}

const EditMeeting = () => {

    const handleEdit = async() => {
        const response = await fetch("/", {
        })
    }

    const handleDelete = async() => {
        const response = await fetch("/", {
        })
    }

    return (
        <>
        <Header />
        <Sidebar />
        <Footer />
        <label>이름</label>
        <label>위치</label>
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
        </>
    )
}

export default EditMeeting;