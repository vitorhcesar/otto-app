import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import {
  CATEGORY_GROUPS,
  type CategoryChild,
  type CategoryGroup,
} from "@/presentation/components/ui/activities-category-catalog";
import {
  CategoryChildIcon,
  CategoryParentIcon,
} from "@/presentation/components/ui/activities-category-icons";
import { FilterCheckboxOnIcon } from "@/presentation/components/ui/activities-filter-icons";
import { SearchIcon } from "@/presentation/components/ui/activities-icons";
import { BackButton } from "@/presentation/components/ui/back-button";
import {
  OttoColors,
  OttoFonts,
  OttoTypography,
} from "@/presentation/constants/theme";

export type ActivitiesCategoriesSheetProps = {
  visible: boolean;
  selected: string[];
  onClose: () => void;
  onToggle: (id: string) => void;
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={styles.checkboxOuter} accessibilityState={{ checked }}>
      {checked ? (
        <FilterCheckboxOnIcon size={20} />
      ) : (
        <View style={styles.checkboxBox}>
          <View style={styles.checkboxInner} />
        </View>
      )}
    </View>
  );
}

function matchesQuery(label: string, query: string) {
  return label.toLowerCase().includes(query);
}

export function ActivitiesCategoriesHeader({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.header}>
      <BackButton onPress={onClose} />
      <Text style={styles.title}>Categorias</Text>
    </View>
  );
}

/** Category picker body — rendered inside the filters Modal (iOS cannot stack Modals). */
export function ActivitiesCategoriesSheet({
  visible,
  selected,
  onClose,
  onToggle,
}: ActivitiesCategoriesSheetProps) {
  const { height } = useWindowDimensions();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (visible) {
      setQuery("");
    }
  }, [visible]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) {
      return CATEGORY_GROUPS.map((group) => ({
        group,
        children: group.children,
      }));
    }

    return CATEGORY_GROUPS.flatMap((group) => {
      const groupMatches = matchesQuery(group.label, normalizedQuery);
      const children = groupMatches
        ? group.children
        : group.children.filter((item) =>
            matchesQuery(item.label, normalizedQuery),
          );

      if (!groupMatches && children.length === 0) {
        return [];
      }

      return [{ group, children }];
    });
  }, [normalizedQuery]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.panel}>
      <View style={styles.searchField}>
        <SearchIcon size={16} />
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar por categorias"
          placeholderTextColor={OttoColors.textSoft}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <ScrollView
        style={[styles.scroll, { maxHeight: height * 0.92 - 160 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {visibleGroups.map(({ group, children }) => (
          <CategoryGroupBlock
            key={group.id}
            group={group}
            childrenItems={children}
            selected={selectedSet}
            onToggle={onToggle}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryGroupBlock({
  group,
  childrenItems,
  selected,
  onToggle,
}: {
  group: CategoryGroup;
  childrenItems: CategoryChild[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  const parentChecked = selected.has(group.id);

  return (
    <View>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: parentChecked }}
        onPress={() => onToggle(group.id)}
        style={styles.parentRow}
      >
        <View style={styles.rowMain}>
          <CategoryParentIcon
            iconKey={group.parentIconKey}
            color={group.color}
          />
          <Text style={styles.parentLabel}>{group.label}</Text>
        </View>
        <Checkbox checked={parentChecked} />
      </Pressable>

      <View style={styles.children}>
        {childrenItems.map((item) => {
          const checked = selected.has(item.id);
          return (
            <Pressable
              key={item.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
              onPress={() => onToggle(item.id)}
              style={styles.childRow}
            >
              <View style={styles.rowMain}>
                <CategoryChildIcon iconKey={item.iconKey} color={group.color} />
                <Text style={styles.childLabel}>{item.label}</Text>
              </View>
              <Checkbox checked={checked} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 16,
    marginHorizontal: -16,
  },
  header: {
    gap: 8,
  },
  title: {
    ...OttoTypography.h1,
    color: OttoColors.text,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 16,
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
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  parentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: OttoColors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  children: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  parentLabel: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textMid,
    fontFamily: OttoFonts.semiBold,
    flex: 1,
  },
  childLabel: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textSoft,
    flex: 1,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: OttoColors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 13,
    height: 13,
    borderRadius: 2.6,
    backgroundColor: OttoColors.background,
  },
});
