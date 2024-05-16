import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { AddNote } from "../services/notesService";
import styled from "styled-components";

export interface NewItem {
  value: string;
  completed: boolean;
}

// Styled component for the createItem component
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CreateItem = ({
  onItemAdded,
}: {
  onItemAdded: (newItem: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [itemsString, setItemsString] = useState(""); // Initialize as an empty string
  const [actionItems, setActionItems] = useState<NewItem[]>([]); // Initialize as an empty array of ActionItem type

  useEffect(() => {
    if (itemsString) {
      const items = itemsString.split(",");
      setActionItems(
        items.map((item) => {
          return { value: item, completed: false };
        })
      );
    }
  }, [itemsString]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const newitem = { title, content, actionItems };
    const res = AddNote(newitem);
    res.then((data) => {
      console.log(data);
      handleClose();
      onItemAdded(data);
    });
  };

  return (
    <Wrapper>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="dense"
            id="itemsString"
            label="Items string (comma separated)"
            type="text"
            fullWidth
            value={itemsString}
            onChange={(e) => setItemsString(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default CreateItem;
