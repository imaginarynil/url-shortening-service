"use client";

import { Alert, Button, Input, Layout, Select, Space, Typography } from "antd";
import { useEffect, useReducer } from "react";
import { urlService } from "./service";
import { validateShortCode, validateUrl } from "./util";
import { Content } from "antd/es/layout/layout";

const BASE_URL = "http://localhost:3000";

const UrlAction = Object.freeze({
  CREATE_SHORT_URL: "CREATE_SHORT_URL",
  UPDATE_SHORT_URL: "UPDATE_SHORT_URL",
  DELETE_SHORT_URL: "DELETE_SHORT_URL",
  GET_URL_STATISTICS: "GET_URL_STATISTICS",
  CREATE_CUSTOM_SHORT_URL: "CREATE_CUSTOM_SHORT_URL",
});

const DEFAULT_URL_ACTION = UrlAction.CREATE_SHORT_URL;

interface State {
  shortCode: string;
  inputUrl: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  action: string;
  urlUpdated: boolean;
  urlDeleted: boolean;
  urlStatsGot: boolean;
  loading: boolean;
  error: string;
}

const initialState: State = {
  shortCode: "",
  inputUrl: "",
  originalUrl: "",
  shortUrl: "",
  accessCount: 0,
  action: DEFAULT_URL_ACTION,
  urlUpdated: false,
  urlDeleted: false,
  urlStatsGot: false,
  loading: false,
  error: "",
};

const UrlReducerAction = Object.freeze({
  CHANGED_SHORT_URL: "CHANGED_SHORT_URL",
  UPDATED_ORIGINAL_URL: "UPDATED_ORIGINAL_URL",
  DELETED_SHORT_URL: "DELETED_SHORT_URL",
  GOT_URL_STATS: "GOT_URL_STATS",
  CHANGED_ACTION: "CHANGED_ACTION",
  CHANGED_SHORT_CODE: "CHANGED_SHORT_CODE",
  CHANGED_INPUT_URL: "CHANGED_INPUT_URL",
  BEGAN_LOADING: "BEGAN_LOADING",
  CHANGED_ERROR: "CHANGED_ERROR",
  CLEARED_ERROR: "CLEARED_ERROR",
});

function urlReducer(state: State, action: any): State {
  switch (action.type) {
    case UrlReducerAction.CHANGED_SHORT_URL:
      return {
        ...state,
        shortUrl: action.shortUrl,
        loading: false,
      };
    case UrlReducerAction.UPDATED_ORIGINAL_URL:
      return {
        ...state,
        originalUrl: action.originalUrl,
        urlUpdated: true,
        loading: false,
      };
    case UrlReducerAction.DELETED_SHORT_URL:
      return {
        ...state,
        urlDeleted: true,
        loading: false,
      };
    case UrlReducerAction.GOT_URL_STATS:
      return {
        ...state,
        shortUrl: action.shortUrl,
        accessCount: action.accessCount,
        urlStatsGot: true,
        loading: false,
      };
    case UrlReducerAction.CHANGED_ACTION:
      return {
        ...initialState,
        action: action.action,
      };
    case UrlReducerAction.CHANGED_SHORT_CODE:
      return {
        ...state,
        shortCode: action.shortCode,
      };
    case UrlReducerAction.CHANGED_INPUT_URL:
      return {
        ...state,
        inputUrl: action.inputUrl,
      };
    case UrlReducerAction.BEGAN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UrlReducerAction.CHANGED_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UrlReducerAction.CLEARED_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(100% - 8px)",
};

export default function Application() {
  const [state, dispatch] = useReducer(urlReducer, initialState);

  // TODO: throw error from util
  function handleValidateUrl(url: string) {
    if (!validateUrl(url)) {
      dispatch({
        type: UrlReducerAction.CHANGED_ERROR,
        error: "URL is not valid",
      });
      return false;
    }
    return true;
  }

  // TODO: throw error from util
  function handleValidateShortCode(shortCode: string) {
    if (!validateShortCode(shortCode)) {
      dispatch({
        type: UrlReducerAction.CHANGED_ERROR,
        error: "Short code is not valid",
      });
      return false;
    }
    return true;
  }

  function handleCreateShortUrl(url: string) {
    if (!handleValidateUrl(url)) {
      return;
    }
    urlService
      .createShortUrl(url)
      .then((data) => {
        dispatch({
          type: UrlReducerAction.CHANGED_SHORT_URL,
          shortUrl: `${BASE_URL}/${data["shortCode"]}`,
        });
      })
      .catch((error) => {
        dispatch({
          type: UrlReducerAction.CHANGED_ERROR,
          error: error.message,
        });
      });
  }

  function handleUpdateShortUrl(shortCode: string, url: string) {
    if (!handleValidateUrl(url)) {
      return;
    }
    if (!handleValidateShortCode(shortCode)) {
      return;
    }
    urlService
      .updateShortUrl(shortCode, url)
      .then((data) => {
        dispatch({
          type: UrlReducerAction.UPDATED_ORIGINAL_URL,
          originalUrl: data["url"],
        });
      })
      .catch((error) => {
        dispatch({
          type: UrlReducerAction.CHANGED_ERROR,
          error: error.message,
        });
      });
  }

  function handleDeleteShortUrl(shortCode: string) {
    if (!handleValidateShortCode(shortCode)) {
      return;
    }
    urlService
      .deleteShortUrl(shortCode)
      .then(() => {
        dispatch({ type: UrlReducerAction.DELETED_SHORT_URL });
      })
      .catch((error) => {
        dispatch({
          type: UrlReducerAction.CHANGED_ERROR,
          error: error.message,
        });
      });
  }

  function handleGetUrlStatistics(shortCode: string) {
    if (!handleValidateShortCode(shortCode)) {
      return;
    }
    urlService
      .getUrlStatistics(shortCode)
      .then((data) => {
        dispatch({
          type: UrlReducerAction.GOT_URL_STATS,
          shortUrl: `${BASE_URL}/${data["shortCode"]}`,
          accessCount: data["accessCount"],
        });
      })
      .catch((error) => {
        dispatch({
          type: UrlReducerAction.CHANGED_ERROR,
          error: error.message,
        });
      });
  }

  function handleCreateCustomShortUrl(shortCode: string, url: string) {
    if (!handleValidateUrl(url)) {
      return;
    }
    if (!handleValidateShortCode(shortCode)) {
      return;
    }
    urlService
      .createCustomShortUrl(shortCode, url)
      .then((data) => {
        dispatch({
          type: UrlReducerAction.CHANGED_SHORT_URL,
          shortUrl: `${BASE_URL}/${data["shortCode"]}`,
        });
      })
      .catch((error) => {
        dispatch({
          type: UrlReducerAction.CHANGED_ERROR,
          error: error.message,
        });
      });
  }

  function handleSubmit(e: any) {
    dispatch({ type: UrlReducerAction.BEGAN_LOADING });
    switch (state.action) {
      case UrlAction.CREATE_SHORT_URL:
        handleCreateShortUrl(state.inputUrl);
        break;
      case UrlAction.UPDATE_SHORT_URL:
        handleUpdateShortUrl(state.shortCode, state.inputUrl);
        break;
      case UrlAction.DELETE_SHORT_URL:
        handleDeleteShortUrl(state.shortCode);
        break;
      case UrlAction.GET_URL_STATISTICS:
        handleGetUrlStatistics(state.shortCode);
        break;
      case UrlAction.CREATE_CUSTOM_SHORT_URL:
        handleCreateCustomShortUrl(state.shortCode, state.inputUrl);
        break;
      default:
        console.error("Unknown action");
    }
  }

  useEffect(() => {
    if (state.error) {
      setTimeout(() => {
        dispatch({ type: UrlReducerAction.CLEARED_ERROR });
      }, 2000);
    }
  }, [state.error]);

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {state.error && (
          <Alert
            title={state.error}
            type="error"
            closable={{ closeIcon: true, "aria-label": "close" }}
            style={{ position: "fixed", top: "2rem" }}
          />
        )}
        <Space
          orientation="vertical"
          style={{ maxWidth: "50%", width: "100%" }}
        >
          <Typography.Title level={1}>URL Shortener</Typography.Title>
          <Select
            defaultValue={DEFAULT_URL_ACTION}
            style={{ maxWidth: 150, width: "100%" }}
            onChange={(value) => {
              dispatch({
                type: UrlReducerAction.CHANGED_ACTION,
                action: value,
              });
            }}
            options={[
              { value: UrlAction.CREATE_SHORT_URL, label: "Create" },
              { value: UrlAction.UPDATE_SHORT_URL, label: "Update" },
              { value: UrlAction.DELETE_SHORT_URL, label: "Delete" },
              { value: UrlAction.GET_URL_STATISTICS, label: "Get stats" },
              {
                value: UrlAction.CREATE_CUSTOM_SHORT_URL,
                label: "Create custom",
              },
            ]}
          />
          {(state.action === UrlAction.UPDATE_SHORT_URL ||
            state.action === UrlAction.CREATE_CUSTOM_SHORT_URL) && (
            <Input
              placeholder="Type your short code here..."
              onChange={(e) => {
                dispatch({
                  type: UrlReducerAction.CHANGED_SHORT_CODE,
                  shortCode: e.target.value,
                });
              }}
              value={state.shortCode}
            />
          )}
          <Space.Compact style={{ width: "100%" }}>
            {state.action === UrlAction.DELETE_SHORT_URL ||
            state.action === UrlAction.GET_URL_STATISTICS ? (
              <Input
                placeholder="Type your short code here..."
                onChange={(e) => {
                  dispatch({
                    type: UrlReducerAction.CHANGED_SHORT_CODE,
                    shortCode: e.target.value,
                  });
                }}
                value={state.shortCode}
              />
            ) : (
              <Input
                placeholder="Type your URL here..."
                onChange={(e) => {
                  dispatch({
                    type: UrlReducerAction.CHANGED_INPUT_URL,
                    inputUrl: e.target.value,
                  });
                }}
                value={state.inputUrl}
              />
            )}
            <Button
              type="primary"
              onClick={(e) => handleSubmit(e)}
              loading={state.loading}
            >
              Submit
            </Button>
          </Space.Compact>
          {(state.action === UrlAction.CREATE_SHORT_URL ||
            state.action === UrlAction.CREATE_CUSTOM_SHORT_URL) && (
            <Typography.Link href={state.shortUrl} target="_blank">
              {state.shortUrl}
            </Typography.Link>
          )}
          {state.urlUpdated && (
            <Typography.Text>
              Updated. New URL:{" "}
              <Typography.Link href={state.originalUrl} target="_blank">
                {state.originalUrl}
              </Typography.Link>
            </Typography.Text>
          )}
          {state.urlDeleted && (
            <Typography.Text>Deleted {state.shortCode}</Typography.Text>
          )}
          {state.urlStatsGot && (
            <Typography.Text>
              {state.shortUrl} has been accessed {state.accessCount} time
              {state.accessCount > 1 && "s"}
            </Typography.Text>
          )}
        </Space>
      </Content>
    </Layout>
  );
}
