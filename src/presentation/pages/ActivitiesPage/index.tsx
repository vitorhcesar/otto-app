import { Image } from "expo-image";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ExpenseArrowIcon,
  FilterSlidersIcon,
  IncomeArrowIcon,
  PlusIcon,
  SearchIcon,
} from "@/presentation/components/ui/activities-icons";
import { BackButton } from "@/presentation/components/ui/back-button";
import {
  EyeClosedIcon,
  EyeOpenIcon,
} from "@/presentation/components/ui/eye-icons";
import {
  OttoColors,
  OttoFonts,
  OttoTypography,
} from "@/presentation/constants/theme";

const FILTERS = ["Entradas", "Saídas", "Pagamentos", "Cartão"] as const;

type FilterId = (typeof FILTERS)[number];

type SummaryCardProps = {
  label: string;
  value: string;
  hidden: boolean;
  onToggleVisibility: () => void;
  tone: "income" | "expense";
};

function SummaryCard({
  label,
  value,
  hidden,
  onToggleVisibility,
  tone,
}: SummaryCardProps) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIconWrap}>
        {tone === "income" ? (
          <IncomeArrowIcon size={12} color={OttoColors.income} />
        ) : (
          <ExpenseArrowIcon size={12} color={OttoColors.expense} />
        )}
      </View>
      <View style={styles.summaryCopy}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <View style={styles.summaryValueRow}>
          <Text style={styles.summaryValue}>{hidden ? "R$*,**" : value}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Mostrar valor" : "Ocultar valor"}
            onPress={onToggleVisibility}
            hitSlop={8}
          >
            {hidden ? <EyeClosedIcon size={16} /> : <EyeOpenIcon size={16} />}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export function ActivitiesPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("Entradas");
  const [incomeVisible, setIncomeVisible] = useState(true);
  const [expenseVisible, setExpenseVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BackButton />
            <Pressable
              style={styles.addButton}
              accessibilityRole="button"
              accessibilityLabel="Adicionar atividade"
            >
              <PlusIcon size={24} color={OttoColors.buttonFilledText} />
            </Pressable>
          </View>
          <Text style={styles.title}>Atividades</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchField}>
            <SearchIcon size={16} color={OttoColors.textSoft} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar atividades"
              placeholderTextColor={OttoColors.textSoft}
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
              returnKeyType="search"
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filtros"
            hitSlop={8}
          >
            <FilterSlidersIcon size={24} color={OttoColors.text} />
          </Pressable>
        </View>

        <View style={styles.filtersWrap}>
          <ScrollView
            horizontal
            style={styles.filtersScroll}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {FILTERS.map((filter) => {
              const selected = filter === activeFilter;
              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[styles.chip, selected && styles.chipSelected]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.summaryRow}>
          <SummaryCard
            label="Total entrada"
            value="R$0,00"
            hidden={!incomeVisible}
            onToggleVisibility={() => setIncomeVisible((current) => !current)}
            tone="income"
          />
          <SummaryCard
            label="Total saídas"
            value="R$0,00"
            hidden={!expenseVisible}
            onToggleVisibility={() => setExpenseVisible((current) => !current)}
            tone="expense"
          />
        </View>

        <View style={styles.emptyState}>
          <Image
            source={require("@/assets/images/auth/logo.png")}
            style={styles.emptyLogo}
            contentFit="contain"
            accessibilityLabel="Otto"
          />
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>Nenhuma atividade encontrada</Text>
            <Text style={styles.emptySubtitle}>
              Você não possui nenhuma atividade financeira registrada
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: OttoColors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...OttoTypography.h1,
    color: OttoColors.text,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: OttoColors.borderSoft,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    ...OttoTypography.body,
    color: OttoColors.text,
    padding: 0,
  },
  filtersWrap: {
    flexGrow: 0,
    flexShrink: 0,
  },
  filtersScroll: {
    flexGrow: 0,
  },
  filters: {
    gap: 10,
    paddingRight: 8,
    alignItems: "center",
  },
  chip: {
    borderRadius: 40,
    backgroundColor: OttoColors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "center",
    justifyContent: "center",
  },
  chipSelected: {
    backgroundColor: OttoColors.text,
  },
  chipText: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textMid,
    lineHeight: 22,
  },
  chipTextSelected: {
    color: OttoColors.buttonFilledText,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: 150,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: OttoColors.borderSoft,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  summaryIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: OttoColors.borderSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCopy: {
    flex: 1,
    gap: 2,
  },
  summaryLabel: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  summaryValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  summaryValue: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textMid,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    maxWidth: 250,
    alignSelf: "center",
    paddingVertical: 32,
  },
  emptyLogo: {
    width: 28,
    height: 28,
    opacity: 0.9,
  },
  emptyCopy: {
    gap: 4,
    alignItems: "center",
  },
  emptyTitle: {
    ...OttoTypography.bodySmall,
    color: OttoColors.text,
    textAlign: "center",
    fontFamily: OttoFonts.semiBold,
  },
  emptySubtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
    textAlign: "center",
  },
});
