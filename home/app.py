import streamlit as st
import requests

st.title("Contact Form")

name = st.text_input("Name")
email = st.text_input("Email")
message = st.text_area("Message")


if st.button("Submit"):
    data = {
        "name": name,
        "email": email,
        "message": message
    }
    response = requests.post("http://127.0.0.1:8001/submit_form", json=data)


    if response.status_code == 200:
        st.success("Form submitted successfully!")

    else:
        st.error("Error submitting form. Please try again")