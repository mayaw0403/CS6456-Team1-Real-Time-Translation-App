import React, { useContext, useEffect, useState } from 'react'
import { TextField } from "@mui/material";

import { Button, deleteChat, ChatEngineContext } from 'react-chat-engine'

import SettingsBlock from './SettingsBlock'

const OptionsSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)
    const chat = chats && chats[activeChat];

    const [description, setDescription] = useState("");

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <SettingsBlock
                id='ce-options-drop-down'
                label='Options'
            >
                <div>
                    <div style={{ height: '8px' }} />
                    {
                        conn && chat && conn.userName === chat.admin.username && (<Button
                            value="Delete"
                            theme='danger'
                            icon='delete'
                            id='ce-delete-chat-button'
                            onClick={() => deleteChat(conn, chat.id, (data) => { })}
                            style={{ width: '100%', marginBottom: '12px' }}
                        />)
                    }

                    <div>
                        <h2>
                            Describe your relationship to this individual
                        </h2>
                        <TextField
                            value={description}
                            label="Describe your relationship to this individual"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <h3>Your Enter Value is: {description} </h3>
                    </div>
                </div>
            </SettingsBlock>
        </div>
    )
}

export default OptionsSettings