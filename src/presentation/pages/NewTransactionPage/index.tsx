import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCategoryDisplay } from '@/presentation/components/ui/activities-category-catalog';
import { CategoryChipIcon } from '@/presentation/components/ui/activities-category-icons';
import {
  ExpenseArrowIcon,
  IncomeArrowIcon,
} from '@/presentation/components/ui/activities-icons';
import { BackButton } from '@/presentation/components/ui/back-button';
import { Button } from '@/presentation/components/ui/button';
import { formatLongDate } from '@/presentation/components/ui/calendar';
import { CategoryPickerSheet } from '@/presentation/components/ui/category-picker-sheet';
import {
  DEFAULT_CURRENCY_CODE,
  getCurrencySymbol,
} from '@/presentation/components/ui/currencies';
import { CurrencyPicker } from '@/presentation/components/ui/currency-picker';
import { DatePickerSheet } from '@/presentation/components/ui/date-picker-sheet';
import {
  TransactionCalendarIcon,
  TransactionChevronRightIcon,
  TransactionPencilIcon,
} from '@/presentation/components/ui/new-transaction-icons';
import {
  OttoColors,
  OttoFonts,
  OttoTypography,
} from '@/presentation/constants/theme';

const TAB_SELECTED_BG = '#212220';

export function NewTransactionPage() {
  const [name, setName] = useState('');
  const [transactionDate, setTransactionDate] = useState(() => new Date());
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const [currencyCode, setCurrencyCode] = useState(DEFAULT_CURRENCY_CODE);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const category = categoryId ? getCategoryDisplay(categoryId) : undefined;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.screen}>
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <BackButton fallbackHref="/(tabs)/activities" />
              <Text style={styles.title}>Nova Transação</Text>
            </View>

            <View style={styles.tabBar}>
              <View style={[styles.tabItem, styles.tabItemSelected]}>
                <IncomeArrowIcon size={12} />
                <Text style={styles.tabLabelSelected}>Entrada</Text>
              </View>
              <View style={styles.tabItem}>
                <ExpenseArrowIcon size={12} />
                <Text style={styles.tabLabel}>Saída</Text>
              </View>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.amountText}>
                {getCurrencySymbol(currencyCode)}
              </Text>
              <Text style={styles.amountText}>00,00</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.sectionTitle}>Dados da Transação</Text>

              <View style={styles.inputShell}>
                <TextInput
                  style={styles.nameInput}
                  placeholder="Nome da transação"
                  placeholderTextColor={OttoColors.textSoft}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setCurrencyOpen(false)}
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  returnKeyType="done"
                  underlineColorAndroid="transparent"
                />
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Selecionar data"
                onPress={() => {
                  setCurrencyOpen(false);
                  setDateSheetOpen(true);
                }}
                style={styles.inputShell}
              >
                <Text style={styles.inputValue}>
                  {formatLongDate(transactionDate)}
                </Text>
                <View style={styles.trailingIcon}>
                  <TransactionCalendarIcon size={16} />
                </View>
              </Pressable>

              <CurrencyPicker
                value={currencyCode}
                open={currencyOpen}
                onOpenChange={setCurrencyOpen}
                onChange={setCurrencyCode}
              />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Selecionar categoria"
              onPress={() => {
                setCurrencyOpen(false);
                setCategorySheetOpen(true);
              }}
              style={styles.categoryRow}
            >
              <View style={styles.categoryLeft}>
                <View style={styles.categoryIconWrap}>
                  {category ? (
                    <CategoryChipIcon
                      iconKey={category.iconKey}
                      color={category.color}
                      size={24}
                    />
                  ) : (
                    <TransactionPencilIcon size={24} />
                  )}
                </View>
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryLabel}>Categoria</Text>
                  <Text style={styles.categoryValue}>
                    {category?.label ?? 'Selecionar'}
                  </Text>
                </View>
              </View>
              <View style={styles.categoryChevron}>
                <TransactionChevronRightIcon size={24} />
              </View>
            </Pressable>
          </ScrollView>

          <Button label="Adicionar transação" disabled />
        </View>
      </KeyboardAvoidingView>

      <DatePickerSheet
        visible={dateSheetOpen}
        value={transactionDate}
        onClose={() => setDateSheetOpen(false)}
        onSelect={setTransactionDate}
      />
      <CategoryPickerSheet
        visible={categorySheetOpen}
        selectedId={categoryId}
        onClose={() => setCategorySheetOpen(false)}
        onSelect={setCategoryId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 24,
  },
  content: {
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    ...OttoTypography.h1,
    color: OttoColors.text,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: OttoColors.surface,
    borderRadius: 40,
    padding: 4,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 24,
  },
  tabItemSelected: {
    backgroundColor: TAB_SELECTED_BG,
    paddingHorizontal: 12,
  },
  tabLabel: {
    ...OttoTypography.caption,
    color: OttoColors.textMid,
  },
  tabLabelSelected: {
    ...OttoTypography.caption,
    color: OttoColors.text,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: OttoColors.borderSoft,
  },
  amountText: {
    ...OttoTypography.h1,
    color: OttoColors.textMid,
  },
  details: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: OttoFonts.semiBold,
    fontSize: 14,
    lineHeight: 22,
    color: OttoColors.text,
  },
  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: OttoColors.borderSoft,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 46,
  },
  nameInput: {
    flex: 1,
    ...OttoTypography.body,
    color: OttoColors.text,
    padding: 0,
    margin: 0,
  },
  inputValue: {
    flex: 1,
    ...OttoTypography.body,
    color: OttoColors.textSoft,
  },
  trailingIcon: {
    width: 16,
    height: 16,
    overflow: 'hidden',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  categoryIconWrap: {
    backgroundColor: OttoColors.surface,
    borderRadius: 12,
    padding: 8,
  },
  categoryCopy: {
    gap: 2,
  },
  categoryLabel: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  categoryValue: {
    ...OttoTypography.bodySmall,
    color: OttoColors.text,
  },
  categoryChevron: {
    padding: 8,
    borderRadius: 24,
  },
});
