import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Select, MenuItem, Grid, Pagination, Box } from '@mui/material';
import CardComponent from './components/card';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const companiesPerPage = 9;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/companies');
        setCompanies(result.data);
        setFilteredCompanies(result.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
      </Box>
      <Grid container spacing={3}>
        {currentCompanies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CardComponent company={company} />
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
    </Container>
  );
};

export default App;