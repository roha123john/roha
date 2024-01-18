import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://65a8addb219bfa371867604e.mockapi.io/todo/todo');
      const data = await response.json();
      const uncompletedTodos = data.filter(todo => !todo.completed);
      const completedTodos = data.filter(todo => todo.completed);
      setTodos(uncompletedTodos);
      setCompletedTodos(completedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id, isCompleted) => {
    try {
      // Delete from API
      await fetch(`https://65a8addb219bfa371867604e.mockapi.io/todo/todo/${id}`, {
        method: 'DELETE',
      });

      const updatedTodos = isCompleted
        ? completedTodos.filter(todo => todo.id !== id)
        : todos.filter(todo => todo.id !== id);

      isCompleted
        ? setCompletedTodos(updatedTodos)
        : setTodos(updatedTodos);

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      // Add new todo to API
      const response = await fetch('https://65a8addb219bfa371867604e.mockapi.io/todo/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
        }),
      });

      const newTodoItem = await response.json();
      setTodos([newTodoItem, ...todos]);
      setNewTodo('');

    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleCompleteTodo = async (id, isCompleted) => {
    try {
      // Update completion status in API
      await fetch(`https://65a8addb219bfa371867604e.mockapi.io/todo/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !isCompleted,
        }),
      });

      const updatedTodos = isCompleted
        ? completedTodos.filter(todo => todo.id !== id)
        : todos.filter(todo => todo.id !== id);

      const completedTodo = todos.find(todo => todo.id === id);
      isCompleted
        ? setCompletedTodos([completedTodo, ...completedTodos])
        : setTodos(updatedTodos);

    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleToggleView = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterButtons}>
        <TouchableOpacity onPress={handleToggleView} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>{showCompleted ? 'Show Incomplete' : 'Show Completed'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>{showCompleted ? 'Completed Todos' : 'Uncompleted Todos'}</Text>
      <FlatList
        data={showCompleted ? completedTodos : todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.texttodo}>{item.todo}</Text>
            <TouchableOpacity
              onPress={() => handleDelete(item.id, showCompleted)}
              style={styles.touch}
            >
              <Image source={require('../delete.png')} style={styles.icon} />
            </TouchableOpacity>
            {!showCompleted && (
              <TouchableOpacity
                onPress={() => handleCompleteTodo(item.id, false)}
                style={styles.touch}
              >
                <Image source={require('../check.png')} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  texttodo: {
    flex: 7,
  },
  touch: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#035E30',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  completeButton: {
    color: 'green',
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#035E30',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 10,
    height: 10,
  },
});

export default TodoList;
