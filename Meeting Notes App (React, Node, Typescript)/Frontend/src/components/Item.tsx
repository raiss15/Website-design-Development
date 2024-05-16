import React, { ReactElement, useState } from "react";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import ActionItemComponent from "./ActionItem"; // Ensure correct import
import styled from "styled-components";
import { UpdateNote } from "../services/notesService";
import { Button } from "@mui/material";

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #4e849c;
  border-radius: 10px;
  padding: 20px;
  margin: 30px;
  gap: 20px;
  min-width: 600px;
`;

const CreatedOnWrapper = styled.div`
  font-size: 13px;
  color: grey;
`;

function Item({
  _id,
  title: initialTitle,
  content: initialContent,
  actionItems: initialActionItems,
  creationDate,
  onItemDeleted,
}: ItemComponentProps): ReactElement {
  const [actionItems, setActionItems] = useState(initialActionItems);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isContentExpanded, setContentExpanded] = useState(false);
  const [isEditingContent, setEditingContent] = useState(false);

  const toggleContentView = () => {
    if (!isEditingContent) {
      setContentExpanded(!isContentExpanded);
    }
  };

  const startEditingContent = () => {
    setEditingContent(true);
    setContentExpanded(true);
  };

  const stopEditingContent = () => {
    setEditingContent(false);
    setContentExpanded(false);
  };

  const truncateContent = (content: string) => {
    const words = content.split(/\s+/);
    if (words.length > 10) {
      return `${words.slice(0, 10).join(" ")}...`;
    }
    return content;
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onActionItemChange = (updatedActionItem) => {
    const updatedActionItems = actionItems.map((item) =>
      item._id === updatedActionItem._id ? updatedActionItem : item
    );
    setActionItems(updatedActionItems);
  };

  const onSave = () => {
    UpdateNote(
      {
        _id,
        title,
        content,
        actionItems,
      },
      _id
    )
      .then(() => {
        console.log("Note updated successfully.");
        stopEditingContent();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <ItemWrapper>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={onTitleChange}
        fullWidth
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {isEditingContent ? (
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={onContentChange}
              onBlur={stopEditingContent}
              autoFocus
              fullWidth
            />
          ) : (
            <Typography
              onClick={startEditingContent}
              style={{
                width: "100%",
                cursor: "pointer",
                whiteSpace: "pre-line",
              }}
            >
              {isContentExpanded ? content : truncateContent(content)}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {actionItems.map((actionItem, index) => (
            <ActionItemComponent
              key={actionItem._id} // Using actionItem._id ensures each component is uniquely identified
              {...actionItem}
              onActionItemChange={onActionItemChange}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <CreatedOnWrapper>Created on: {creationDate}</CreatedOnWrapper>
      <Button
        variant="contained"
        color="error"
        onClick={() => onItemDeleted(_id)}
      >
        Delete Note
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        style={{ marginLeft: "10px" }}
      >
        Save Changes
      </Button>
    </ItemWrapper>
  );
}

export default Item;
