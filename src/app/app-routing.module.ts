import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'notification/:id',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'tabs/tab1',
    loadChildren: () =>
      import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'tab3/:id',
    loadChildren: () =>
      import('./tab3/tab3.module').then((m) => m.Tab3PageModule),
  },
  {
    path: 'tab4/:id',
    loadChildren: () =>
      import('./tab4/tab4.module').then((m) => m.Tab4PageModule),
  },
  {
    path: 'tab5',
    loadChildren: () =>
      import('./tab5/tab5.module').then((m) => m.Tab5PageModule),
  },
  {
    path: 'activity-details/:id',
    loadChildren: () =>
      import('./activity-details/activity-details.module').then(
        (m) => m.ActivityDetailsPageModule
      ),
  },
  {
    path: 'chestworkouts',
    loadChildren: () =>
      import('./chestworkouts/chestworkouts.module').then(
        (m) => m.ChestworkoutsPageModule
      ),
  },

  {
    path: 'absworkouts',
    loadChildren: () =>
      import('./absworkouts/absworkouts.module').then(
        (m) => m.AbsworkoutsPageModule
      ),
  },
  {
    path: 'legworkouts',
    loadChildren: () =>
      import('./legworkouts/legworkouts.module').then(
        (m) => m.LegworkoutsPageModule
      ),
  },
  {
    path: 'armsworkouts',
    loadChildren: () =>
      import('./armsworkouts/armsworkouts.module').then(
        (m) => m.ArmsworkoutsPageModule
      ),
  },
  {
    path: 'shoulderworkouts',
    loadChildren: () =>
      import('./shoulderworkouts/shoulderworkouts.module').then(
        (m) => m.ShoulderworkoutsPageModule
      ),
  },
  {
    path: 'backworkouts',
    loadChildren: () =>
      import('./backworkouts/backworkouts.module').then(
        (m) => m.BackworkoutsPageModule
      ),
  },
  {
    path: 'addnewsfeeds',
    loadChildren: () =>
      import('./addnewsfeeds/addnewsfeeds.module').then(
        (m) => m.AddnewsfeedsPageModule
      ),
  },
  {
    path: 'editnewsfeeds/:idNewsFeeds/:userID',
    loadChildren: () =>
      import('./editnewsfeeds/editnewsfeeds.module').then(
        (m) => m.EditnewsfeedsPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'activity-details',
    loadChildren: () =>
      import('./activity-details/activity-details.module').then(
        (m) => m.ActivityDetailsPageModule
      ),
  },
  {
    path: 'chestworkouts',
    loadChildren: () =>
      import('./chestworkouts/chestworkouts.module').then(
        (m) => m.ChestworkoutsPageModule
      ),
  },

  {
    path: 'absworkouts',
    loadChildren: () =>
      import('./absworkouts/absworkouts.module').then(
        (m) => m.AbsworkoutsPageModule
      ),
  },
  {
    path: 'legworkouts',
    loadChildren: () =>
      import('./legworkouts/legworkouts.module').then(
        (m) => m.LegworkoutsPageModule
      ),
  },
  {
    path: 'armsworkouts',
    loadChildren: () =>
      import('./armsworkouts/armsworkouts.module').then(
        (m) => m.ArmsworkoutsPageModule
      ),
  },
  {
    path: 'shoulderworkouts',
    loadChildren: () =>
      import('./shoulderworkouts/shoulderworkouts.module').then(
        (m) => m.ShoulderworkoutsPageModule
      ),
  },
  {
    path: 'backworkouts',
    loadChildren: () =>
      import('./backworkouts/backworkouts.module').then(
        (m) => m.BackworkoutsPageModule
      ),
  },
  {
    path: 'addchestworkout',
    loadChildren: () =>
      import('./addchestworkout/addchestworkout.module').then(
        (m) => m.AddchestworkoutPageModule
      ),
  },
  {
    path: 'edit-workout/:id',
    loadChildren: () =>
      import('./edit-workout/edit-workout.module').then(
        (m) => m.EditWorkoutPageModule
      ),
  },
  {
    path: 'fitness-plan-type',
    loadChildren: () =>
      import('./fitness-plan-type/fitness-plan-type.module').then(
        (m) => m.FitnessPlanTypePageModule
      ),
  },
  {
    path: 'addworkouttoplan',
    loadChildren: () =>
      import('./addworkouttoplan/addworkouttoplan.module').then(
        (m) => m.AddworkouttoplanPageModule
      ),
  },
  {
    path: 'recommended-plan-detail/:planTypeName',
    loadChildren: () =>
      import('./recommended-plan-detail/recommended-plan-detail.module').then(
        (m) => m.RecommendedPlanDetailPageModule
      ),
  },
  {
    path: 'add-upcoming/:planID',
    loadChildren: () =>
      import('./add-upcoming/add-upcoming.module').then(
        (m) => m.AddUpcomingPageModule
      ),
  },
  {
    path: 'completed-activity',
    loadChildren: () =>
      import('./completed-activity/completed-activity.module').then(
        (m) => m.CompletedActivityPageModule
      ),
  },
  {
    path: 'create-workout',
    loadChildren: () => import('./create-workout/create-workout.module').then( m => m.CreateWorkoutPageModule)
  },
  {
    path: 'buddy',
    loadChildren: () => import('./buddy/buddy.module').then( m => m.BuddyPageModule)
  },
  {
    path: 'plan-detail-countdown/:dataObj',
    loadChildren: () => import('./plan-detail-countdown/plan-detail-countdown.module').then( m => m.PlanDetailCountdownPageModule)
  },
  {
    path: 'addworkouttoplan/:id',
    loadChildren: () => import('./addworkouttoplan/addworkouttoplan.module').then( m => m.AddworkouttoplanPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
