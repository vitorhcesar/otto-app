import { useWindowDimensions, View, StyleSheet } from 'react-native';

import {
  ActivitiesCategoriesHeader,
  ActivitiesCategoriesSheet,
} from '@/presentation/components/ui/activities-categories-sheet';
import { Sheet } from '@/presentation/components/ui/sheet';

export type CategoryPickerSheetProps = {
  visible: boolean;
  selectedId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export function CategoryPickerSheet({
  visible,
  selectedId,
  onClose,
  onSelect,
}: CategoryPickerSheetProps) {
  const { height } = useWindowDimensions();

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      header={<ActivitiesCategoriesHeader onClose={onClose} />}
      showCloseButton={false}
      contentStyle={[styles.sheet, { height: height * 0.92 }]}
    >
      <View style={styles.body}>
        <ActivitiesCategoriesSheet
          visible={visible}
          selected={selectedId ? [selectedId] : []}
          onClose={onClose}
          onToggle={(id) => {
            onSelect(id);
            onClose();
          }}
        />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
});
