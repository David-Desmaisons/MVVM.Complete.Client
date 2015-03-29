using MVVM.Awesomium.AdvancedControl.ViewModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace MVVM.Awesomium.AdvancedControl
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            var window = new MainWindow();
            this.MainWindow = window;
            window.DataContext = new MainViewModel();
            window.Show();
        }
    }
}
