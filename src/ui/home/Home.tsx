import React, { useState, useEffect, useRef } from 'react';
import { bind } from '../../utils/bind';
import styles from './Home.module.css';
import logo from '../../logo.svg';
import { ResponseBack } from '../../domain/ResponseBack';
import { getBack } from '../../infrastructure/getBack';

const cx = bind(styles);

interface Props {}

export const Home: React.FunctionComponent<Props> = () => {

    const appBack = process.env.REACT_APP_BACK || 'http://localhost:8080/'
    const videoURL = process.env.REACT_APP_videoURL || 'https://youtube.com/meloinvento/'

    const jumpLogTest: ResponseBack = {
        team: "",
        uptime: "false",
        versions: [
          {
            name: "Backend Connection Error...",
            tag: "00000000",
            success: false
          }
        ]
    };

    const Ref = useRef(null);

    const [tags, setTags] = useState({ ...jumpLogTest });
    const [finalMessage, setFinalMessage] = useState("");
    const [congratsMessage, setCongratsMessage] = useState("");

    const randomNumberInRange = (min: number, max: number) => {
        return Math.floor(Math.random() 
                * (max - min + 1)) + min;
    };
    

    const startTimer = () => {
    }

    const clearTimer = async () => {
        const id = setInterval(async () => {

            var response: ResponseBack = {} as any;
            response = await getBack(appBack);
            setTags(response);

            response.versions.forEach(
                item => {
                    if (item.tag === "") {
                        item.tag = randomNumberInRange(11111111,99999999).toString()
                    }
                    if (item.name === "Track ID - 3" && item.success) {
                        setFinalMessage(videoURL)
                        setCongratsMessage("&#128640; Congratulations &#128640;")
                    }
                }
            )

            setTags(response);
            
        }, 1500)
    }

    useEffect(() => {
      clearTimer();
    }, []);

    const listItems = tags.versions.map((tag) =>
    <span>
        <p>{tag.name}</p>
        <h3 className={tag.success ? cx('App-body-numbers-ok') : cx('App-body-numbers-ko')}>
        {tag.tag}
        </h3>
        <br></br>
    </span>
    );

    return (
    <div className={cx('App')}>
      <header className={cx('App-header')}>
          <span></span>
      </header>
      <body className={cx('App-body')}>
        <span className={cx('App-body-empty')}></span>
        <span className={cx('App-body-team')}>    
            <img src={logo} className={cx('App-logo')} alt="logo" />
            <h1>TEAM</h1>
            <h2>{tags.team}</h2>
        </span>
        <span className={cx('App-body-numbers')}>
            {listItems}
        </span>
        <span className={cx('App-body-empty')}></span>
        </body>
        <span className={cx('App-video-url')}>
            <h2>
                {congratsMessage}
            </h2>
            <br></br>
            <h2>
                {finalMessage}
            </h2>
        </span>
    </div>
      );
    };