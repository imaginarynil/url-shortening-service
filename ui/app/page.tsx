"use client";

import { Button, Flex, Input, Space, Typography } from "antd";
import Image from "next/image";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  function handleSubmit(e: any) {
    console.log(url);
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
