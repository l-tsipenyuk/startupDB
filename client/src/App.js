import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Select, MenuItem, Grid, Pagination, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CardComponent from './components/card';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({
    Name: '', Description: '', Link: '', Contact: '', ContactRole: '', Edge: '',
    Country: '', GrowthStage: '', Category: '', Keyword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const companiesPerPage = 9;

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const results = companies.filter(company =>
      company.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || company.Category === category)
    );
    setFilteredCompanies(results);
    setPage(1);
  }, [searchTerm, category, companies]);

  const fetchCompanies = async () => {
    try {
      const result = await axios.get('http://localhost:3000/api/companies');
      setCompanies(result.data);
      setFilteredCompanies(result.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCompany({ Name: '', Category: '', Description: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newCompany.Name) errors.Name = 'Name is required';
    if (!newCompany.Description) errors.Description = 'Description is required';
    if (!newCompany.Link) errors.Link = 'Link is required';
    if (!newCompany.Category) errors.Category = 'Category is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCompany = async () => {
    try {
      await axios.post('http://localhost:3000/api/companies', newCompany);
      handleCloseDialog();
      fetchCompanies();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const indexOfLastCompany = page * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
        />
        <Select
          value={category}
          onChange={handleCategoryChange}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Tech">Tech</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginTop: '1rem' }}>
          Add New Company
        </Button>
      </Box>
      <Grid container spacing={3}>
        {currentCompanies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CardComponent 
              company={company} 
              onDelete={() => handleDeleteCompany(company.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Box my={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredCompanies.length / companiesPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="Name"
            label="Company Name"
            type="text"
            fullWidth
            value={newCompany.Name}
            onChange={handleInputChange}
            error={!!formErrors.Name}
            helperText={formErrors.Name}
          />
          <TextField
            required
            margin="dense"
            name="Description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newCompany.Description}
            onChange={handleInputChange}
            error={!!formErrors.Description}
            helperText={formErrors.Description}
          />
          <TextField
            required
            margin="dense"
            name="Link"
            label="Link"
            type="url"
            fullWidth
            value={newCompany.Link}
            onChange={handleInputChange}
            error={!!formErrors.Link}
            helperText={formErrors.Link}
          />
          <TextField
            required
            margin="dense"
            name="Category"
            label="Category"
            type="text"
            fullWidth
            value={newCompany.Category}
            onChange={handleInputChange}
            error={!!formErrors.Category}
            helperText={formErrors.Category}
          />
          <TextField
            margin="dense"
            name="Contact"
            label="Contact"
            type="text"
            fullWidth
            value={newCompany.Contact}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="ContactRole"
            label="Contact Role"
            type="text"
            fullWidth
            value={newCompany.ContactRole}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Edge"
            label="Edge"
            type="text"
            fullWidth
            value={newCompany.Edge}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Country"
            label="Country"
            type="text"
            fullWidth
            value={newCompany.Country}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="GrowthStage"
            label="Growth Stage"
            type="text"
            fullWidth
            value={newCompany.GrowthStage}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Keyword"
            label="Keyword"
            type="text"
            fullWidth
            value={newCompany.Keyword}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCompany} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
  

export default App;