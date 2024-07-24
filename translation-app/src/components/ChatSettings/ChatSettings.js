import React, { useContext, useState, useEffect } from 'react'
import { simpleTranslation } from '../AzureTranslate'
import { Button, deleteChat, ChatEngineContext, ChatSettingsTop, PeopleSettings, OptionsSettings } from 'react-chat-engine'
import SettingsBlock from './SettingsBlock'


const ChatSettings = props => {
    // return <></>
    const { conn, chats, activeChat } = useContext(ChatEngineContext)
    const chat = chats && chats[activeChat]


    const [label, setLabel] = useState("Chat Settings")
    const language = localStorage.getItem("language");
    useEffect(() => {
        async function translateLabel() {
            const newLabel = await simpleTranslation(label, language);
            setLabel(newLabel);
        }
        translateLabel();
    });

    if (conn === null) return <div />

    return (
        <div style={styles.settingsContainer} className='ce-settings'>
            <div style={{ width: '100%', padding: '5%' }} className='ce-settings-container'>
                
                <div style={{display: "flex", justifyContent: "center"}}><h4><b>{label}</b></h4></div>
                {
                    props.renderPeopleSettings ?
                        props.renderPeopleSettings(conn, chat) :
                        <PeopleSettings />
                }

                {
                    props.renderOptionsSettings ?
                        props.renderOptionsSettings(conn, chat) :
                        <OptionsSettings />
                }

                <SettingsBlock id="ce-options-drop-down" label="Rename Chat">
                    <div style={{ paddingBottom: "10px" }}>
                        {
                            props.renderChatSettingsTop ?
                                props.renderChatSettingsTop(conn, chat) :
                                <ChatSettingsTop />
                        }
                    </div>
                </SettingsBlock>

                {conn && chat && conn.userName === chat.admin.username && (
                    <SettingsBlock id="ce-options-drop-down" label="Delete">
                        <Button
                            value="Delete"
                            theme="danger"
                            icon="delete"
                            id="ce-delete-chat-button"
                            onClick={() =>
                                deleteChat(conn, chat.id, (data) => { })
                            }
                            style={{ width: "100%", marginBottom: "12px" }}
                        />
                    </SettingsBlock>
                )}
            </div>
        </div>
    )
}

export default ChatSettings

const styles = {
    settingsContainer: {
        height: '100%',
        overflow: 'scroll',
        overflowX: 'hidden',
        borderLeft: '1px solid #afafaf',
        backgroundColor: 'white',
        fontFamily: 'Avenir'
    }
}