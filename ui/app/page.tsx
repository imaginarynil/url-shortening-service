"use client";

import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Select,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { MouseEvent, useState } from "react";

const API_BASE_URL = "http://localhost:8080/shorten";

async function createShortUrl(url: string) {
  try {
    const res = await axios.post(API_BASE_URL, { url: url });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function retrieveOriginalUrl(shortCode: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/${shortCode}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function isUrlValid(str: string) {
  let url;
  try {
    url = new URL(str);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const Action = Object.freeze({
  CREATE_SHORT_URL: "CREATE_SHORT_URL",
  RETRIEVE_ORIGINAL_URL: "RETRIEVE_ORIGINAL_URL",
  UPDATE_SHORT_URL: "UPDATE_SHORT_URL",
  DELETE_SHORT_URL: "DELETE_SHORT_URL",
  GET_URL_STATISTICS: "GET_URL_STATISTICS",
  CREATE_CUSTOM_SHORT_URL: "CREATE_CUSTOM_SHORT_URL",
});

export default function Home() {
  const defaultAction = Action.CREATE_SHORT_URL;
  const [inputUrl, setInputUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [action, setAction] = useState<string>(defaultAction);

  function handleCreateShortUrl(url: string) {
    if (url.trim().length === 0) {
      console.log("URL cannot be empty");
      return;
    }
    if (!isUrlValid(url)) {
      console.log("URL is not valid");
      return;
    }
    createShortUrl(url)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {});
  }

  function handleRetrieveOriginalUrl(shortCode: string) {
    if (shortCode.trim().length === 0) {
      console.log("Short code cannot be empty");
      return;
    }
    if (!/^[A-Za-z0-9]+$/.test(shortCode)) {
      console.log("Short code can only contain letters and digits");
      return;
    }
    retrieveOriginalUrl(shortCode)
      .then((data) => {
        setOriginalUrl(data["url"]);
      })
      .catch((error) => {});
  }

  function handleSubmit(e: any) {
    switch (action) {
      case Action.CREATE_SHORT_URL:
        handleCreateShortUrl(inputUrl);
        break;
      case Action.RETRIEVE_ORIGINAL_URL:
        handleRetrieveOriginalUrl(shortCode);
        break;
      default:
        console.log("Unknown action");
    }
  }

  return (
    <Space orientation="vertical">
      <Typography.Text>URL Shortener</Typography.Text>
      <Select
        defaultValue={defaultAction}
        style={{ width: 120 }}
        onChange={(value) => setAction(value)}
        options={[
          { value: Action.CREATE_SHORT_URL, label: "Create" },
          { value: Action.RETRIEVE_ORIGINAL_URL, label: "Get original" },
        ]}
      />
      <Space.Compact style={{ width: "100%" }}>
        {action === Action.RETRIEVE_ORIGINAL_URL ? (
          <Input
            placeholder="Type your short code here..."
            onChange={(e) => setShortCode(e.target.value)}
            value={shortCode}
          />
        ) : (
          <Input
            placeholder="Type your URL here..."
            onChange={(e) => setInputUrl(e.target.value)}
            value={inputUrl}
          />
        )}
        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Space.Compact>
      <Typography.Link href={originalUrl} target="_blank">
        {originalUrl}
      </Typography.Link>
    </Space>
  );
}
