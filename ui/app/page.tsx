"use client";

import { Button, Flex, Input, Space, Typography } from "antd";
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

function isUrlValid(str: string) {
  let url;
  try {
    url = new URL(str);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default function Home() {
  const [url, setUrl] = useState("");
  function handleSubmit(e: any) {
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
  return (
    <div>
      <Typography>URL Shortener</Typography>
      <Space.Compact>
        <Input
          placeholder="Type your URL here..."
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
}
