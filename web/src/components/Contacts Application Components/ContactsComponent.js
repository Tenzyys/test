import React, { useEffect, useState, useRef, createContext } from "react";

import "./ContactsComponent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PhoneInfo from "../UserInfoComponents/PhoneInfo";
import UserContact from "../Call Application Components/UserContact";
import ContactDetail from "./ContactDetail";
import AddToContacts from "./AddToContacts";
import { fetchNui } from "../../utils/fetchNui";

export const ContactDetailContext = createContext();

const ContactsComponent = ({isAddContactOpen , setIsAddContactOpen}) => {
  const searchInput = useRef(null);

  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    // comes from ServerSide
    // setContacts([
    //   {
    //     mmd: "0917251159",
    //   },
    //   {
    //     Ali: "0917251145",
    //   },
    //   {
    //     Reza: "0917251856",
    //   },
    //   {
    //     Gholam: "0917251635",
    //   },
    //   {
    //     Nigger: "0917251785",
    //   },
    //   {
    //     Gay: "0917251258",
    //   },
    //   {
    //     Samad: "0917251654",
    //   },
    //   {
    //     Faght: "0917251222",
    //   },
    //   {
    //     Mighad: "0917251333",
    //   },
    //   {
    //     Nimmmma: "0917251445",
    //   },
    //   {
    //     Sirrrr: "0917251977",
    //   },
    //   {
    //     niki: "0917251850",
    //   },
    // ]);
    fetchNui("GetContacts", {}).then(data=>{
      setContacts(data)
    });
  }, []);
  const [searchedContact, setsearchedContact] = useState([]);
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false);
  const [contactDetail, setContactDetail] = useState({});
  const [selectedContact, setselectedContact] = useState({});

  const searchHandler = (e) => {
    if (e.target.value) {
      setsearchedContact(
        contacts.filter((item) => Object.keys(item)[0].toLowerCase().includes(e.target.value.toLowerCase()) && item)
      );
    } else {
      setsearchedContact([]);
    }
  };

  const openAddContact =() => {
    if (!isAddContactOpen) {
      setIsAddContactOpen(true)
    }
  }

  return (
    <div id="contacts-container">
      <div className="first-section">
        <p>Contacts</p>
        <button onClick={openAddContact}>+</button>
        {isAddContactOpen && <AddToContacts setIsAddContactOpen={setIsAddContactOpen}/>}
      </div>
      <div className="second-section">
        <div className="search-container">
          <FontAwesomeIcon
            icon="fa-magnifying-glass"
            style={{ color: "#827E87" }}
          />
          <input
            ref={searchInput}
            onChange={searchHandler}
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
      <ContactDetailContext.Provider
        value={{
          isContactDetailOpen,
          setIsContactDetailOpen,
          contacts,
          setContacts,
        }}
      >
        <div className="user-contacts-container">
          <PhoneInfo />
          {isContactDetailOpen && (
            <ContactDetail
              close={setIsContactDetailOpen}
              data={selectedContact}
            />
          )}
          {searchedContact.length === 0
            ? contacts.map((item) => {
                return (
                  <UserContact
                    key={Object.values(item)}
                    contactName={Object.keys(item)}
                    contactDetail={item}
                    setselectedContact={setselectedContact}
                    setContactDetail={setContactDetail}
                    noUse={contactDetail}
                  />
                );
              })
            : searchedContact.map((item) => {
                return (
                  <UserContact
                    key={Object.values(item)}
                    contactName={Object.keys(item)}
                    contactDetail={item}
                    setContactDetail={setContactDetail}
                  />
                );
              })}
        </div>
      </ContactDetailContext.Provider>
    </div>
  );
};

export default ContactsComponent;
