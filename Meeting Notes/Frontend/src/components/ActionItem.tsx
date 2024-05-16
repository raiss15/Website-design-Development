import { Checkbox, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ActionItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const ActionItemTextField = styled(TextField)<{ completed: boolean }>`
  width: 100%;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

export interface ActionComponentProps {
  _id: string;
  itemId?: string;
  value: string;
  completed: boolean;
  onActionItemChange: (updatedActionItem: any) => void;
}

const ActionItem: React.FC<ActionComponentProps> = ({
  value,
  completed,
  _id,
  onActionItemChange,
}) => {
  const [isCompleted, setIsCompleted] = React.useState(completed);
  const [actionValue, setActionValue] = React.useState(value);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
    onActionItemChange({
      _id,
      value: actionValue,
      completed: event.target.checked,
    });
  };

  return (
    <ActionItemContainer>
      <Checkbox checked={isCompleted} onChange={handleCheckboxChange} />
      <ActionItemTextField
        completed={isCompleted}
        fullWidth={true}
        value={actionValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (isCompleted) {
            event.target.style.textDecoration = "line-through";
          } else {
            event.target.style.textDecoration = "none";
          }
          setActionValue(event.target.value);
          onActionItemChange({
            _id,
            value: event.target.value,
            completed: isCompleted,
          });
        }}
      />
    </ActionItemContainer>
  );
};

export default ActionItem;
