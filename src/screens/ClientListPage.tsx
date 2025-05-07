import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { IconButton, Chip, Searchbar } from 'react-native-paper';

const data = [];

const FilterButton = ({ onPress }) => (
  <IconButton
    icon="tune"
    mode="outlined"
    iconColor="black"
    size={20}
    onPress={onPress}
  />
);

const SearchButton = ({ onPress }) => (
  <IconButton
    icon="magnify"
    mode="outlined"
    iconColor="black"
    size={20}
    onPress={onPress}
  />
);

const TableHeader = () => (
  <View style={[styles.row]}>
    <Text style={styles.cell}>Nome</Text>
    <Text style={styles.cell}>Situação</Text>
  </View>
);

const TableRow = ({ item }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{item.name}</Text>
    <Text style={styles.cell}>{item.status}</Text>
  </View>
);

export default function ClientListPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    let list = data;

    if (selectedFilter !== 'Todos') {
      list = list.filter((item) => item.status === selectedFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(query));
    }

    return list;
  }, [selectedFilter, searchQuery]);

  const handleChipPress = (value) => {
    setSelectedFilter((prev) => (prev === value ? 'Todos' : value));
  };

  return (
    <View style={styles.container}>
      {/* Header com título e botões */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Lista de Alunas</Text>
        <View style={{ flexDirection: 'row' }}>
          <SearchButton onPress={() => setShowSearch((prev) => !prev)} />
          <FilterButton onPress={() => setShowFilters((prev) => !prev)} />
        </View>
      </View>

      {/* <Divider /> */}

      <View style={styles.searchContainer}>
        {showSearch && (
          <Searchbar
            placeholder="Buscar por nome..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        )}
      </View>

      {/* Chips de filtro */}
      {showFilters && (
        <View style={styles.chipsContainer}>
          {['Todos', 'Pago', 'Pendente'].map((label) => {
            const isSelected = selectedFilter === label;

            const getIconName = () => {
              if (label === 'Pago') return 'cash-check';
              if (label === 'Pendente') return 'cash-remove';
              return 'check-circle-outline';
            };

            return (
              <Chip
                key={label}
                selected={isSelected}
                onPress={() => handleChipPress(label)}
                style={[styles.chip, isSelected && styles.chipSelected]}
                selectedColor="black"
                showSelectedCheck={false}
              >
                <View style={styles.chipContent}>
                  <MaterialCommunityIcons
                    name={getIconName()}
                    size={20}
                    color={isSelected ? 'black' : 'gray'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.chipText}>
                    {label === 'Pago'
                      ? 'Pagamento realizado'
                      : label === 'Pendente'
                        ? 'Pagamento pendente'
                        : 'Todos'}
                  </Text>
                </View>
              </Chip>
            );
          })}
        </View>
      )}

      {/* Tabela */}
      <TableHeader />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={TableRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    margin: 15,
  },
  headerRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    alignSelf: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#e0e0e0',
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 16,
  },
  searchbar: {
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 0, // Remove o padding vertical para que o conteúdo ocupe menos espaço
    paddingHorizontal: 10, // Ajuste o padding horizontal se necessário
  },
  searchContainer: {},
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 16,
  },
});
