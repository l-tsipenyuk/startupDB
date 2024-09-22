import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, IconButton, Box, Button } from '@mui/material';
import { Business, Close, Link as LinkIcon, Person, Work, Lightbulb, Public, TrendingUp, Category, Label, Delete } from '@mui/icons-material';
import './CardComponent.css';

const CardComponent = ({ company, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(company.id);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  return (
    <>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <CardHeader
            avatar={
              <Avatar>
                <Business />
              </Avatar>
            }
            title={company.Name}
            action={
              <IconButton onClick={handleDeleteClick} color="error">
                <Delete />
              </IconButton>
            }
          />
        </CardActionArea>
      </Card>

      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          {company.Name}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className="info-item">
            <LinkIcon />
            <Typography><strong>Link:</strong> <a href={company.Link} target="_blank" rel="noopener noreferrer">{company.Link}</a></Typography>
          </Box>
          <Box className="info-item">
            <Person />
            <Typography><strong>Contact:</strong> {company.Contact}</Typography>
          </Box>
          <Box className="info-item">
            <Work />
            <Typography><strong>Contact Role:</strong> {company.ContactRole}</Typography>
          </Box>
          <Box className="info-item">
            <Lightbulb />
            <Typography><strong>Edge:</strong> {company.Edge}</Typography>
          </Box>
          <Box className="info-item">
            <Public />
            <Typography><strong>Country:</strong> {company.Country}</Typography>
          </Box>
          <Box className="info-item">
            <TrendingUp />
            <Typography><strong>Growth Stage:</strong> {company.GrowthStage}</Typography>
          </Box>
          <Box className="info-item">
            <Category />
            <Typography><strong>Category:</strong> {company.Category}</Typography>
          </Box>
          <Box className="info-item">
            <Label />
            <Typography><strong>Keyword:</strong> {company.Keyword}</Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the company "{company.Name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardComponent;