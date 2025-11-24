---
category : iOS
tags : [iOS, learning, apple, tutorial]
date: 2013-11-13
title: "Update Uicollectionview Items And Sections"
draft: false
---

I met some problem when inserting items & sections to a UICollectionView today, and I found something I missed when using UICollectionView whose layout is kind of flowlayout at first.

## **Supplementary is required sometimes**

If you implemented the UICollectionViewDelegate method 

    - (CGSize) collectionView:(UICollectionView *) collectionView layout:(UICollectionViewLayout *) collectionViewLayout referenceSizeForHeaderInSection:(NSInteger) section

but not implementing the UICollectionViewDataSource method 
    
    - (UICollectionReusableView *) collectionView:(UICollectionView *) collectionView viewForSupplementaryElementOfKind:(NSString *) kind atIndexPath:(NSIndexPath *) indexPath

It may cause crash problem when insert items to UICollectionView, the log is like that

    2013-11-14 00:08:30.057 ISCollectionViewTest[29991:a0b] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '*** setObjectForKey: object cannot be nil (key: <_UICollectionViewItemKey: 0x897e640> Type = SV Kind = UICollectionElementKindSectionHeader IndexPath = <NSIndexPath: 0x897e5d0> {length = 2, path = 0 - 0})'

## **Update DataSource before update UICollectionView**

[The apple officical document] tells us it is critical to update our data source before notifying the 
collection view of any changes. The collection view methods assume that your data source contains the currently correct data. If it does not, the collection view might receive the wrong set of items from your data source or ask for items that are not there and crash your app. If you didn't follow the rules recommanded by apple, you will receive app crash log like that
    
    2013-11-14 00:13:52.606 ISCollectionViewTest[30015:a0b] *** Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'Invalid update: invalid number of items in section 1.  The number of items contained in an existing section after the update (11) must be equal to the number of items contained in that section before the update (10), plus or minus the number of items inserted or deleted from that section (0 inserted, 0 deleted) and plus or minus the number of items moved into or out of that section (0 moved in, 0 moved out).'

The log shows that there was 11 items in a existing section in your datasource, but you only created 10 cells for these 11 items, then app crashed. 

## **Use batch update method**

When you have multiple update actions, you should use the `performBatchUpdates:completion: ` method to notify the collection of all changes. That means if you want to insert a new item to a new section, you shouldn't insert a new section and a new item separately like 

    [collectionView insertItemsAtIndexPath: ....];
    [collectionView insertSection: ....];

Doing like above will cause app crash, the proper way is batch update these two changes to UICollecionView
    
    [self.collectionView performBatchUpdates:^{
        [collectionView insertItemsAtIndexPath: ....];
        [collectionView insertSection: ....];
    } completion:nil];

Then the UICollectionView can update its view correctly.

[1]: https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCellsandViews/CreatingCellsandViews.html