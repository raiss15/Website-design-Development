import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Item, { ItemProps } from "./Item";
import { GetNotes, DeleteNote } from "../services/notesService";
import CreateItem from "./CreateItem";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const StyledHeader = styled.div`
  color: #4e849c;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; // Adjust the margin as necessary
`;

const Search = muiStyled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 10,
  backgroundColor: "#007FFF", // Adjust the blue as necessary
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  maxWidth: "400px", // Adjust width as necessary
}));

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius * 10,
    backgroundColor: "#007FFF",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(2)})`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
  },
}));

function ItemContainer(): ReactElement {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    GetNotes()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const onItemAdded = (newItem: ItemProps) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const onItemDeleted = async (itemId: string) => {
    try {
      await DeleteNote(itemId);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to match search query against the title, content, and action items
  const itemMatchesSearch = (item: ItemProps) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      (item.actionItems &&
        item.actionItems.some((actionItem) =>
          actionItem.value.toLowerCase().includes(query)
        ))
    );
  };

  return (
    <div>
      <StyledHeader>MEETING NOTES</StyledHeader>
      <FlexContainer>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <CreateItem onItemAdded={onItemAdded} />
      </FlexContainer>
      {items.filter(itemMatchesSearch).map((item) => (
        <Item
          key={item._id}
          _id={item._id}
          title={item.title}
          content={item.content}
          actionItems={item.actionItems}
          creationDate={item.creationDate}
          completed={item.completed}
          onItemDeleted={onItemDeleted}
        />
      ))}
    </div>
  );
}

export default ItemContainer;
