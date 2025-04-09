// src/components/IconButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ícones da biblioteca Material

/**
 * Botão com ícone reutilizável para ações como editar ou deletar
 *
 * @param {string} icon - Nome do ícone Material (ex: 'edit', 'delete')
 * @param {function} onPress - Função chamada ao clicar no botão
 * @param {string} color - Cor do ícone
 * @param {string} accessibilityLabel - Texto para acessibilidade
 */
export default function IconButton({ icon, onPress, color = '#333', accessibilityLabel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      accessibilityRole="button"
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.6}
    >
      <MaterialIcons name={icon} size={22} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    marginLeft: 6,
  },
});
