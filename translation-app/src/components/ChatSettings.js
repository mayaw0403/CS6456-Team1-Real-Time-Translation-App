import React, { useContext } from 'react'

import { ChatEngineContext, ChatSettingsTop, PeopleSettings, OptionsSettings } from 'react-chat-engine'


const ChatSettings = props => {
    // return <></>
    const { conn, chats, activeChat } = useContext(ChatEngineContext)
    const chat = chats && chats[activeChat]

    if (conn === null) return <div />

    return (
        <div style={styles.settingsContainer} className='ce-settings'>
            <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>
                {
                    props.renderChatSettingsTop ?
                        props.renderChatSettingsTop(conn, chat) :
                        <ChatSettingsTop />
                }

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