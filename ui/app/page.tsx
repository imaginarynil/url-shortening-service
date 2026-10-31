"use client";

import { Button, Input, Select, Space, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/shorten";
const UI_BASE_URL = "http://shortener.com";

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

async function updateShortUrl(shortCode: string, url: string) {
  try {
    const res = await axios.put(`${API_BASE_URL}/${shortCode}`, { url: url });
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

async function deleteShortUrl(shortCode: string) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${shortCode}`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

async function getUrlStatistics(shortCode: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/${shortCode}/stats`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

async function createCustomShortUrl(shortCode: string, url: string) {
  console.log(`${shortCode} ${url}`);

  try {
    const res = await axios.post(`${API_BASE_URL}/custom`, {
      shortCode: shortCode,
      url: url,
    });
    return res.data;
  } catch (error: any) {
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

const UrlAction = Object.freeze({
  CREATE_SHORT_URL: "CREATE_SHORT_URL",
  RETRIEVE_ORIGINAL_URL: "RETRIEVE_ORIGINAL_URL",
  UPDATE_SHORT_URL: "UPDATE_SHORT_URL",
  DELETE_SHORT_URL: "DELETE_SHORT_URL",
  GET_URL_STATISTICS: "GET_URL_STATISTICS",
  CREATE_CUSTOM_SHORT_URL: "CREATE_CUSTOM_SHORT_URL",
});

interface Payload {
  shortenedUrl: string;
  accessCount: number;
}

export default function Home() {
  const defaultAction = UrlAction.CREATE_SHORT_URL;
  const [inputUrl, setInputUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [payload, setPayload] = useState<Payload>({
    shortenedUrl: "",
    accessCount: 0,
  });
  const [action, setAction] = useState<string>(defaultAction);
  const [urlUpdated, setUrlUpdated] = useState(false);
  const [urlDeleted, setUrlDeleted] = useState(false);
  const [urlStatsGot, setUrlStatsGot] = useState(false);

  function validateUrl(url: string) {
    if (url.trim().length === 0) {
      console.log("URL cannot be empty");
      return false;
    }
    if (!isUrlValid(url)) {
      console.log("URL is not valid");
      return false;
    }
    return true;
  }

  function validateShortCode(shortCode: string) {
    if (shortCode.trim().length === 0) {
      console.log("Short code cannot be empty");
      return false;
    }
    if (!/^[A-Za-z0-9]+$/.test(shortCode)) {
      console.log("Short code can only contain letters and digits");
      return false;
    }
    return true;
  }

  function handleCreateShortUrl(url: string) {
    if (!validateUrl(url)) {
      return;
    }
    createShortUrl(url)
      .then((data) => {
        setShortenedUrl(`${UI_BASE_URL}/${data["shortCode"]}`);
        console.log(data);
      })
      .catch((error) => {});
  }

  function handleRetrieveOriginalUrl(shortCode: string) {
    if (!validateShortCode) {
      return;
    }
    retrieveOriginalUrl(shortCode)
      .then((data) => {
        setOriginalUrl(data["url"]);
      })
      .catch((error) => {});
  }

  function handleUpdateShortUrl(shortCode: string, url: string) {
    if (!validateUrl(url)) {
      return;
    }
    if (!validateShortCode(shortCode)) {
      return;
    }
    updateShortUrl(shortCode, url)
      .then((data) => {
        setOriginalUrl(data["url"]);
        setUrlUpdated(true);
      })
      .catch((error) => {});
  }

  function handleDeleteShortUrl(shortCode: string) {
    if (!validateShortCode(shortCode)) {
      return;
    }
    deleteShortUrl(shortCode)
      .then((data) => {
        setOriginalUrl(data["url"]);
        setUrlDeleted(true);
      })
      .catch((error) => {});
  }

  function handleGetUrlStatistics(shortCode: string) {
    if (!validateShortCode(shortCode)) {
      return;
    }
    getUrlStatistics(shortCode)
      .then((data) => {
        setPayload({
          shortenedUrl: `${UI_BASE_URL}/${data["shortCode"]}`,
          accessCount: data["accessCount"],
        });
        setUrlStatsGot(true);
      })
      .catch((error) => {});
  }

  function handleCreateCustomShortUrl(shortCode: string, url: string) {
    if (!validateUrl(url)) {
      return;
    }
    if (!validateShortCode(shortCode)) {
      return;
    }
    createCustomShortUrl(shortCode, url)
      .then((data) => {
        setShortenedUrl(`${UI_BASE_URL}/${data["shortCode"]}`);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    setInputUrl("");
    setOriginalUrl("");
    setShortCode("");
    setShortenedUrl("");
    setUrlUpdated(false);
    setUrlDeleted(false);
    setUrlStatsGot(false);
  }, [action]);

  function handleSubmit(e: any) {
    switch (action) {
      case UrlAction.CREATE_SHORT_URL:
        handleCreateShortUrl(inputUrl);
        break;
      case UrlAction.RETRIEVE_ORIGINAL_URL:
        handleRetrieveOriginalUrl(shortCode);
        break;
      case UrlAction.UPDATE_SHORT_URL:
        handleUpdateShortUrl(shortCode, inputUrl);
        break;
      case UrlAction.DELETE_SHORT_URL:
        handleDeleteShortUrl(shortCode);
        break;
      case UrlAction.GET_URL_STATISTICS:
        handleGetUrlStatistics(shortCode);
        break;
      case UrlAction.CREATE_CUSTOM_SHORT_URL:
        handleCreateCustomShortUrl(shortCode, inputUrl);
        break;
      default:
        console.log("Unknown action");
    }
  }

  return (
    <Space orientation="vertical">
      <Typography.Title level={1}>URL Shortener</Typography.Title>
      <Select
        defaultValue={defaultAction}
        style={{ width: 150 }}
        onChange={(value) => setAction(value)}
        options={[
          { value: UrlAction.CREATE_SHORT_URL, label: "Create" },
          { value: UrlAction.RETRIEVE_ORIGINAL_URL, label: "Get original" },
          { value: UrlAction.UPDATE_SHORT_URL, label: "Update" },
          { value: UrlAction.DELETE_SHORT_URL, label: "Delete" },
          { value: UrlAction.GET_URL_STATISTICS, label: "Get stats" },
          { value: UrlAction.CREATE_CUSTOM_SHORT_URL, label: "Create custom" },
        ]}
      />
      {(action === UrlAction.UPDATE_SHORT_URL ||
        action === UrlAction.CREATE_CUSTOM_SHORT_URL) && (
        <Input
          placeholder="Type your short code here..."
          onChange={(e) => setShortCode(e.target.value)}
          value={shortCode}
        />
      )}
      <Space.Compact style={{ width: "100%" }}>
        {action === UrlAction.RETRIEVE_ORIGINAL_URL ||
        action === UrlAction.DELETE_SHORT_URL ||
        action === UrlAction.GET_URL_STATISTICS ? (
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
      {(action === UrlAction.CREATE_SHORT_URL ||
        action === UrlAction.CREATE_CUSTOM_SHORT_URL) && (
        <Typography.Link href={shortenedUrl} target="_blank">
          {shortenedUrl}
        </Typography.Link>
      )}
      {action === UrlAction.RETRIEVE_ORIGINAL_URL && (
        <Typography.Link href={originalUrl} target="_blank">
          {originalUrl}
        </Typography.Link>
      )}
      {action === UrlAction.UPDATE_SHORT_URL && urlUpdated && (
        <Typography.Text>
          Updated. New URL:{" "}
          <Typography.Link href={originalUrl} target="_blank">
            {originalUrl}
          </Typography.Link>
        </Typography.Text>
      )}
      {urlDeleted && <Typography.Text>Deleted {shortCode}</Typography.Text>}
      {urlStatsGot && (
        <Typography.Text>
          {payload.shortenedUrl} has been accessed {payload.accessCount} time
          {payload.accessCount > 1 && "s"}
        </Typography.Text>
      )}
    </Space>
  );
}
